# Cybersecurity Awareness & Incident Response Portal

🛡️ **Live Demo**: [View Portal](https://thabo-mavundla.github.io/Cybersecurity-incident-reporting-portal/index.html)

A comprehensive web application designed to educate employees, provide real-time threat alerts, and streamline the process of reporting and handling security incidents. This professional cybersecurity portal features advanced contact management, incident reporting, and interactive threat intelligence dashboard.

## 🚀 Features

### 1. About Section
- **Organization Commitment**: Overview of cybersecurity dedication with statistics
- **Security Team Profiles**: Meet the team members (Treasure Mashabane, Thabo Mavundla, Rebafenyi Mudau, Ditshego Kgwadi)
- **Interactive Timeline**: Cybersecurity initiative milestones using Timeline.js
- **Partner Logos**: Display of security partner organizations

### 2. Threat Intelligence Section
- **Live Threat Alerts**: Real-time security alerts with severity levels
- **Weekly Security Bulletins**: Downloadable security reports
- **Interactive World Map**: Global cyberattack trends visualization using Leaflet.js and OpenStreetMap
- **Threat Analytics Charts**: Attack types distribution and monthly trends using Chart.js
- **Continent Details Modal**: Interactive threat information with detailed breakdowns

### 3. Policies & Resources Section
- **Downloadable Policies**: 
  - Access Control Policies (Password, MFA, PAM)
  - Data Protection Policies (Classification, Retention, Encryption)
  - Incident Response Plans
- **Best Practice Guides**: Email security, remote work, mobile devices, cloud security
- **Infographics & Cheat Sheets**: Quick reference materials for common security topics

### 4. Contact Center

- **Security Request Portal**: Comprehensive online form with Formspree integration for structured security inquiries.
- **Emergency Response Hotline**: 24/7 dedicated line for immediate escalation of critical security incidents.
- **Corporate Location & Access**: Interactive mapping tool with office coordinates, directions, and verified contact details.
- **Security FAQ Chatbot**: AI-driven chatbot for addressing frequently raised security concerns.
- **Live Chat Support**: Integrated real-time assistance available during standard operating hours.

### 5. Incident Reporting
- **Advanced Report Form**: Comprehensive incident submission with priority selection
- **File Upload System**: Drag-and-drop file attachments (up to 10MB per file)
- **Firebase Integration**: Secure data storage and real-time synchronization
- **Ticket Generation**: Automated ticket creation with unique IDs
- **Priority Visualization**: Visual priority selection (Low, Medium, High, Critical)
- **Email Notifications**: Automated confirmations via Formspree
- **Emergency Contacts**: Multiple contact methods for urgent incidents

### 6. Footer & Social Integration
- **Newsletter Subscription**: Email signup for security updates
- **Social Media Integration**: Twitter, LinkedIn, Facebook, YouTube links
- **Quick Links**: Organized navigation with direct resource access
- **Contact Information**: Prominently displayed emergency and support contacts

## 🎨 Design Features

- **Dark Theme**: Professional cybersecurity aesthetic with consistent color scheme
- **Responsive Design**: Mobile-friendly interface with optimized layouts
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Accessibility**: Keyboard navigation and screen reader support
- **Modern UI**: Clean, professional design with cybersecurity focus
- **Visual Priority Indicators**: Color-coded threat levels and priority systems

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+) - No frameworks as per specification
- **Visualization**: 
  - Chart.js for analytics charts
  - Leaflet.js with OpenStreetMap for interactive world maps
  - Timeline.js for cybersecurity timeline
- **Backend Integration**:
  - Firebase for data storage and file uploads
  - Formspree for email form submissions
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **CDN Integration**: All external libraries loaded via CDN

## 📁 File Structure

```
cybersecurity-portal/
├── index.html              # Main landing page
├── about.html              # Team profiles and organization info
├── threat-intelligence.html # Threat dashboard with interactive map
├── policies.html           # Policies and resources
├── contact.html            # Contact center with chatbot
├── report-incident.html    # Incident reporting with file upload
├── training.html           # Security training modules
├── styles.css              # Main stylesheet (3200+ lines)
├── script.js               # Main JavaScript (4300+ lines)
├── firebase.js             # Firebase configuration
└── README.md               # Documentation
```

## 🚀 Getting Started

### 🌐 GitHub Pages Deployment

This portal is designed to be deployed on GitHub Pages for easy hosting:

1. **Fork or Clone**: Get this repository
2. **Enable Pages**: Go to Settings → Pages → Deploy from branch (main)
3. **Access**: Your site will be available at `https://yourusername.github.io/repository-name`

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CDN resources and Firebase)

### Local Development

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/yourusername/cybersecurity-portal.git
   cd cybersecurity-portal
   ```

2. **Open the Application**: 
   - Option 1: Double-click `index.html` to open in your default browser
   - Option 2: Serve via HTTP server for full functionality

3. **HTTP Server Setup** (Recommended for local testing):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server -p 8080
   
   # Using VS Code Live Server extension
   Right-click index.html → "Open with Live Server"
   ```

4. **Access**: Navigate to `http://localhost:8000` (or your chosen port)

## 🔧 Configuration

### GitHub Pages Setup
To deploy on GitHub Pages:
1. Update the live demo URL in this README with your actual GitHub Pages URL
2. Replace `yourusername` with your GitHub username in all example URLs
3. Ensure all file paths use forward slashes for cross-platform compatibility

### Firebase Integration
The incident reporting system uses Firebase for data storage:
- Project ID: `incident-2c0cb`
- Storage bucket configured for file uploads
- Firestore database for incident reports
- **Note**: Update Firebase configuration in `firebase.js` for your organization

### Form Integration
Contact and incident forms use Formspree:
- Endpoint: `https://formspree.io/f/xkgzaknk`
- Email notifications enabled
- Form validation and error handling
- **Note**: Replace with your own Formspree endpoint for production use

### Customization
- **Team Members**: Update team profiles in the About section
- **Organization Details**: Modify company-specific information throughout the site
- **Color Scheme**: Adjust CSS variables in `styles.css` for your brand colors
- **Contact Information**: Update emergency contacts and office details in contact.html
- **Social Media**: Configure social media links in footer section
- **Maps**: Update office location coordinates in the contact page map

## 🔒 Security Features

- **Incident Reporting**: Secure Firebase storage with authentication
- **Data Validation**: Client-side and server-side form validation
- **File Upload Security**: Type and size restrictions (10MB limit)
- **Email Security**: Formspree integration with spam protection
- **Responsive Alerts**: Real-time notification system
- **Emergency Contacts**: Multiple redundant contact methods

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🎯 Target Audience

- Corporate employees
- IT teams
- Security officers
- General staff with varying technical knowledge

## 🚀 Future Enhancements

- **Real API Integration**: Connect to live threat intelligence feeds
- **User Authentication**: Role-based access control
- **Advanced Analytics**: Machine learning threat detection
- **Mobile App**: Native mobile application
- **Multi-language Support**: Internationalization
- **Advanced Chatbot**: NLP-powered security assistant

## 🛡️ Security Considerations

- **Input Sanitization**: Validate all form inputs
- **HTTPS**: Use secure connections in production
- **API Keys**: Secure storage of Firebase credentials
- **Rate Limiting**: Implement API rate limiting
- **Audit Trail**: Logging for security incidents
- **File Security**: Virus scanning for uploaded files

## 📧 Support

For technical support or questions:
- **Issues**: Create an issue on this GitHub repository
- **Documentation**: Refer to inline code comments and this README
- **Customization**: Fork the repository and modify for your organization's needs
- **Security**: Update contact information and credentials for your organization

## 📄 License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute according to your organization's needs. Please update all contact information, Firebase credentials, and Formspree endpoints for your own deployment.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📊 Features Overview

This cybersecurity portal provides a comprehensive solution for organizational security management:

- **🛡️ Real-time Threat Intelligence**: Live threat alerts and interactive world map
- **📞 Contact Center**: Multi-channel support with chatbot assistance
- **🚨 Incident Reporting**: Advanced reporting system with file uploads
- **📄 Policy Management**: Downloadable security policies and guidelines
- **🎓 Training Resources**: Interactive security awareness training
- **📈 Analytics Dashboard**: Visual threat analytics and trends

---

**Built for cybersecurity excellence** 🛡️

Empowering organizations through education, awareness, and rapid incident response.
