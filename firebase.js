// firebase.js
// Your Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDytH0xwh9FzeelD99nvD2MoBfc4sGWDDE",
  authDomain: "cairp-fdf46.firebaseapp.com",
  projectId: "cairp-fdf46",
  storageBucket: "cairp-fdf46.appspot.com",
  messagingSenderId: "204382648100",
  appId: "1:204382648100:web:a3ab3ca1cee9d6c73c25b1",
  measurementId: "G-5MBPBB1CLF"
};

// Initialize Firebase App
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase services and make them globally available
var db = firebase.firestore();
window.db = db;

// Blog Posts Functions
function getFeaturedBlogPosts() {
  return db.collection('blogPosts')
    .orderBy('publishDate', 'desc')
    .limit(3)
    .get()
    .then(function(snapshot) {
      return snapshot.docs.map(function(doc) {
        var data = doc.data();
        return {
          id: doc.id,
          ...data,
          formattedDate: data.publishDate.toDate().toLocaleDateString()
        };
      });
    });
}

// Calendar Events Function
function fetchCalendarEvents() {
  return db.collection('events').get()
    .then(function(snapshot) {
      return snapshot.docs.map(function(doc) {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    });
}

// Resource Functions (newly added)
function fetchResources() {
  return db.collection('resources').get()
    .then(function(snapshot) {
      return snapshot.docs.map(function(doc) {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    });
}

window.firebaseFunctions = {
  getFeaturedBlogPosts: getFeaturedBlogPosts,
  fetchCalendarEvents: fetchCalendarEvents,
  fetchResources: fetchResources,
  getBlogPostById: getBlogPostById,
  getEventById: getEventById,
  fetchPastEvents: fetchPastEvents,
  addCalendarEvent: addCalendarEvent,
  updateCalendarEvent: updateCalendarEvent,
  deleteCalendarEvent: deleteCalendarEvent,
  // Training Module Functions
  fetchTrainingPrograms: fetchTrainingPrograms,
  fetchQuizzes: fetchQuizzes,
  saveQuizScore: saveTrainingQuizScore,
  fetchLeaderboard: fetchTrainingLeaderboard
};
console.log("Firebase and its functions are ready.");

// Function to get a single blog post by its ID
function getBlogPostById(postId) {
  return db.collection('blogPosts').doc(postId).get()
    .then(function(doc) {
      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data(),
          formattedDate: doc.data().publishDate.toDate().toLocaleDateString()
        };
      } else {
        return null; // Document not found
      }
    });
}

// Function to get a single event by its ID
function getEventById(eventId) {
  return db.collection('events').doc(eventId).get()
    .then(function(doc) {
      if (doc.exists) {
        return {
          id: doc.id,
          ...doc.data()
        };
      } else {
        return null; // Document not found
      }
    });
}

// Function to fetch past events for the archive
function fetchPastEvents() {
  const today = new Date().toISOString().slice(0, 10);
  return db.collection('events')
    .where('date', '<', today)
    .orderBy('date', 'desc')
    .get()
    .then(function(snapshot) {
      return snapshot.docs.map(function(doc) {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    });
}

// Function to add a new event to the calendar
function addCalendarEvent(eventData) {
  return db.collection('events')
    .add({
      title: eventData.title,
      description: eventData.description || '',
      date: eventData.date,
      time: eventData.time || '',
      type: eventData.type || 'general',
      priority: eventData.priority || 'medium',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: eventData.createdBy || 'User'
    })
    .then(function(docRef) {
      console.log('Event added with ID: ', docRef.id);
      return docRef.id;
    })
    .catch(function(error) {
      console.error('Error adding event: ', error);
      throw error;
    });
}

// Function to update an existing event
function updateCalendarEvent(eventId, eventData) {
  return db.collection('events')
    .doc(eventId)
    .update({
      title: eventData.title,
      description: eventData.description || '',
      date: eventData.date,
      time: eventData.time || '',
      type: eventData.type || 'general',
      priority: eventData.priority || 'medium',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
      console.log('Event updated successfully');
      return eventId;
    })
    .catch(function(error) {
      console.error('Error updating event: ', error);
      throw error;
    });
}

// Function to delete an event
function deleteCalendarEvent(eventId) {
  return db.collection('events')
    .doc(eventId)
    .delete()
    .then(function() {
      console.log('Event deleted successfully');
      return eventId;
    })
    .catch(function(error) {
      console.error('Error deleting event: ', error);
      throw error;
    });
}

// === TRAINING MODULE FIREBASE FUNCTIONS ===

// Function to fetch training programs
function fetchTrainingPrograms() {
  return db.collection('trainingPrograms')
    .orderBy('order', 'asc')
    .get()
    .then(function(snapshot) {
      if (snapshot.empty) {
        // Return static data if no programs in database
        return getStaticTrainingPrograms();
      }
      return snapshot.docs.map(function(doc) {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    })
    .catch(function(error) {
      console.error('Error fetching training programs: ', error);
      return getStaticTrainingPrograms();
    });
}

// Function to fetch quizzes
function fetchQuizzes() {
  return db.collection('quizzes')
    .get()
    .then(function(snapshot) {
      if (snapshot.empty) {
        // Return static quiz if no quizzes in database
        return getStaticQuiz();
      }
      return snapshot.docs.map(function(doc) {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    })
    .catch(function(error) {
      console.error('Error fetching quizzes: ', error);
      return getStaticQuiz();
    });
}

// Function to save quiz score
function saveTrainingQuizScore(userId, score, totalQuestions, quizId = 'default') {
  const userScore = {
    userId: userId || 'anonymous_' + Math.random().toString(36).substr(2, 9),
    score: score,
    totalQuestions: totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
    completedAt: firebase.firestore.FieldValue.serverTimestamp(),
    quizId: quizId
  };
  
  return db.collection('quizScores')
    .add(userScore)
    .then(function(docRef) {
      console.log('Quiz score saved with ID: ', docRef.id);
      return docRef.id;
    })
    .catch(function(error) {
      console.error('Error saving quiz score: ', error);
      throw error;
    });
}

// Function to fetch leaderboard
function fetchTrainingLeaderboard(limit = 4) {
  return db.collection('quizScores')
    .orderBy('score', 'desc')
    .orderBy('completedAt', 'desc')
    .limit(limit)
    .get()
    .then(function(snapshot) {
      if (snapshot.empty) {
        // Return static leaderboard if no scores in database
        return getStaticLeaderboard();
      }
      return snapshot.docs.map(function(doc, index) {
        const data = doc.data();
        return {
          id: doc.id,
          rank: index + 1,
          name: data.userName || `User ${data.userId.substring(0, 8)}`,
          department: data.department || 'Unknown',
          score: data.score,
          total: data.totalQuestions,
          percentage: data.percentage,
          completedAt: data.completedAt
        };
      });
    })
    .catch(function(error) {
      console.error('Error fetching leaderboard: ', error);
      return getStaticLeaderboard();
    });
}

// Static fallback data functions
function getStaticTrainingPrograms() {
  return [
    {
      id: 'phishing',
      title: 'Phishing Awareness Insights',
      description: 'Learn about the latest phishing techniques and how to recognize them through expert insights.',
      type: 'phishing',
      progress: 0,
      buttonText: 'View Insights',
      link: 'https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks',
      order: 1
    },
    {
      id: 'ransomware',
      title: 'Ransomware Defense Guide',
      description: 'Access comprehensive resources about ransomware prevention and response strategies.',
      type: 'ransomware',
      progress: 0,
      buttonText: 'Access Guide',
      link: 'https://www.cisa.gov/stopransomware',
      order: 2
    },
    {
      id: 'hygiene',
      title: 'Cyber Hygiene Best Practices',
      description: 'Discover essential security practices for password management and safe browsing.',
      type: 'hygiene',
      progress: 0,
      buttonText: 'Read Practices',
      link: 'https://www.cisa.gov/sites/default/files/publications/Cyber%20Hygiene%20Services%20-%20Fact%20Sheet_S508C.pdf',
      order: 3
    },
    {
      id: 'quiz',
      title: 'Security Knowledge Assessment',
      description: 'Test your cybersecurity knowledge with comprehensive quizzes.',
      type: 'quiz',
      progress: 85,
      buttonText: 'Take Assessment',
      order: 4
    }
  ];
}

function getStaticQuiz() {
  return [{
    id: 'cybersecurity-basics',
    title: 'Cybersecurity Fundamentals Quiz',
    questions: [
      {
        question: 'What is the most effective way to prevent phishing attacks?',
        options: [
          'Installing antivirus software',
          'Verifying sender identity before clicking links',
          'Using strong passwords',
          'Updating software regularly'
        ],
        correctAnswerIndex: 1
      },
      {
        question: 'Which of the following is a sign of a potential malware infection?',
        options: [
          'Slow computer performance',
          'Unexpected pop-up windows',
          'Unfamiliar programs running',
          'All of the above'
        ],
        correctAnswerIndex: 3
      },
      {
        question: 'What should you do if you receive a suspicious email?',
        options: [
          'Forward it to colleagues',
          'Click links to investigate',
          'Report it to IT security',
          'Reply asking for verification'
        ],
        correctAnswerIndex: 2
      },
      {
        question: 'How often should you update your passwords?',
        options: [
          'Never, once set they are secure',
          'Every 90 days or when compromised',
          'Only when required by the system',
          'Every few years'
        ],
        correctAnswerIndex: 1
      },
      {
        question: 'What is two-factor authentication?',
        options: [
          'Using two different passwords',
          'Logging in from two devices',
          'Adding an extra security step beyond passwords',
          'Having two user accounts'
        ],
        correctAnswerIndex: 2
      }
    ]
  }];
}

function getStaticLeaderboard() {
  return [
    { rank: 1, name: 'Treasure Mashabane', department: 'IT Security', score: 9, total: 10, percentage: 90 },
    { rank: 2, name: 'Rebafenyi Mudau', department: 'Security Operations', score: 8, total: 10, percentage: 80 },
    { rank: 3, name: 'Ditshego Kgwadi', department: 'Security Awareness', score: 7, total: 10, percentage: 70 },
    { rank: 4, name: 'Thabo Mavundla', department: 'Cybersecurity Engineering', score: 6, total: 10, percentage: 60 }
  ];
}