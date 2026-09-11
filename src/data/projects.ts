/**
 * Real projects from github.com/isanka23.
 *
 * The blurbs are drawn from each repo's own description. Expand them with
 * specifics as you go — what the hard part was, what you'd do differently.
 */
export type Project = {
  index: string;
  title: string;
  category: string;
  blurb: string;
  tech: string[];
  code?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "AquaClean",
    category: "Final Year Project / ML",
    blurb:
      "Underwater waste detection system — computer vision applied to identifying and classifying submerged debris.",
    tech: ["Python", "Computer Vision", "Deep Learning"],
    code: "https://github.com/isanka23/AquaClean-Underwater-Waste-Detection",
  },
  {
    index: "02",
    title: "EventLoop",
    category: "Full-Stack / Web",
    blurb:
      "Scalable event platform with Cloudinary-powered media handling, automated similar-event suggestions, and PostHog behaviour tracking.",
    tech: ["Next.js", "TypeScript", "Cloudinary", "PostHog"],
    code: "https://github.com/isanka23/EventLoop",
    live: "https://event-loop-alpha.vercel.app",
  },
  {
    index: "03",
    title: "Movie Mate",
    category: "Mobile / Flutter",
    blurb:
      "Flutter app for exploring films and TV shows — trending lists, search, and rich media pulled from a movie API.",
    tech: ["Flutter", "Dart", "REST API"],
    code: "https://github.com/isanka23/Movie_Mate",
  },
  {
    index: "04",
    title: "Chat App",
    category: "Mobile / Flutter",
    blurb:
      "Flutter chat client covering navigation, JSON parsing, API integration, local storage, state management, and user authentication.",
    tech: ["Flutter", "Dart", "Auth", "Local Storage"],
    code: "https://github.com/isanka23/Chat_App",
  },
  {
    index: "05",
    title: "Weather App",
    category: "Mobile / Flutter",
    blurb:
      "Real-time weather by geolocation or city name, using Provider for state and SharedPreferences to persist user settings.",
    tech: ["Flutter", "Dart", "Provider", "SharedPreferences"],
    code: "https://github.com/isanka23/weather_app",
  },
  {
    index: "06",
    title: "Todo App",
    category: "Mobile / Flutter",
    blurb:
      "Task manager built around Go Router for navigation and Hive for fast local persistence.",
    tech: ["Flutter", "Dart", "Go Router", "Hive"],
    code: "https://github.com/isanka23/Todo_App_with_Go_Router_Hive_Packages",
  },
];
