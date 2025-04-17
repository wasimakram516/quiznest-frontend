import "./styles/globals.css";
import ThemeRegistry from "@/app/styles/themeRegistry";
import { MessageProvider } from "@/app/context/MessageContext";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata = {
  title: "QuizNest – WhiteWall",
  description:
    "Quiznest lets businesses create branded quiz experiences with flexible design, questions, and real-time results. Built for engagement, powered by customization.",
  keywords:
    "Quiznest, Quiz App, Branded Quizzes, Business Games, Interactive Quizzes, Custom Quiz Builder, Web Quiz Platform, WhiteWall Digital Solutions",
  author: "WhiteWall Digital Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#033649" />
        <link rel="icon" href="/quiznest-icon.png" type="image/png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
      </head>
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <MessageProvider>{children}</MessageProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
