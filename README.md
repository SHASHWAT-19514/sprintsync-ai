# 🎮 SprintSync AI

> Transform engineering meetings into actionable tasks with AI-powered analysis

SprintSync AI is a retro-styled Next.js application that uses IBM WatsonX AI to automatically extract tasks, assign owners, set priorities, and generate sprint-ready action items from meeting transcripts.

## ✨ Features

- 🤖 **AI-Powered Analysis**: Leverages IBM WatsonX Granite 3 8B Instruct model
- 📊 **Smart Task Extraction**: Automatically identifies tasks, owners, priorities, and deadlines
- 🎯 **Priority Classification**: Categorizes tasks as High, Medium, or Low priority
- 👥 **Team Assignment**: Assigns tasks to Backend, Frontend, QA, or DevOps teams
- 📈 **Analytics Dashboard**: Real-time insights on task distribution and team workload
- 📄 **PDF Export**: Generate professional task reports
- 🎨 **Retro UI**: Built with NES.css for a nostalgic 8-bit aesthetic

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- IBM Cloud account with WatsonX access
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sprintsync-ai.git
   cd sprintsync-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your IBM WatsonX credentials**
   
   Edit `.env.local` and add your credentials:
   ```env
   WATSONX_API_KEY=your_actual_api_key_here
   WATSONX_PROJECT_ID=your_actual_project_id_here
   WATSONX_URL=enterURLhere
   ```

   **How to get your credentials:**
   - Log in to [IBM Cloud](https://cloud.ibm.com/)
   - Navigate to your WatsonX project
   - Copy your API key and Project ID from the project settings

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Paste Meeting Transcript**: Copy your meeting notes or transcript into the input area
2. **Click "Generate Tasks"**: Let AI analyze the content
3. **Review Results**: See extracted tasks with owners, priorities, and deadlines
4. **Export**: Download tasks as PDF for distribution

### Example Transcript

```
Team meeting notes:
- Sarah will implement the new authentication system by Friday
- Backend API needs optimization - assign to Mike, high priority
- John to create the dashboard UI components this week
- QA team should test the login flow before deployment
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **AI Model**: IBM WatsonX Granite 3 8B Instruct
- **Styling**: NES.css (Retro 8-bit UI)
- **PDF Generation**: jsPDF
- **HTTP Client**: Axios

## 📁 Project Structure

```
sprintsync-ai/
├── app/
│   ├── api/
│   │   └── generate-tasks/
│   │       └── route.ts          # WatsonX API integration
│   ├── components/
│   │   ├── TranscriptInput.tsx   # Input component
│   │   ├── TaskCard.tsx          # Task display component
│   │   └── BobInsightCard.tsx    # AI insights component
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
├── public/                       # Static assets
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── SECURITY.md                   # Security guidelines
└── README.md                     # This file
```

## 🔒 Security

**IMPORTANT**: Never commit sensitive credentials to version control.

- `.env.local` is automatically ignored by git
- Use `.env.example` as a template
- See [SECURITY.md](SECURITY.md) for detailed security guidelines

## 📊 Analytics Features

SprintSync AI provides real-time analytics:

- **Priority Breakdown**: High/Medium/Low task distribution
- **Task Type Analysis**: Backend/Frontend/QA task counts
- **Team Workload**: Number of tasks per team member
- **Total Tasks**: Overall task count from meeting

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- IBM WatsonX for AI capabilities
- NES.css for the retro UI framework
- Next.js team for the amazing framework

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Check [SECURITY.md](SECURITY.md) for security-related concerns

---

**Built with ❤️ for engineering teams**
