import devfest from "@/assets/moment-devfest.webp";
import devsincPhoto from "@/assets/moment-ai-hackathon.webp";
import mobileHack from "@/assets/moment-mobile-hackathon.webp";
import mou from "@/assets/moment-mou.webp";
import recognition from "@/assets/moment-recognition.webp";
import samsung from "@/assets/moment-samsung.webp";
import googleCloud from "@/assets/moment-google-cloud.webp";
import softecPhoto from "@/assets/moment-devsinc.webp";

/** Real event photos for "Beyond the code". Captions stay factual: no invented titles or awards. */
export type Moment = { src: string; caption: string; alt: string; w: number; h: number; category: "Event" | "Training" | "Industry" };

export const moments: Moment[] = [
  { src: devfest, caption: "DevFest 2025", alt: "Atiq Umer wearing a DevFest 2025 attendee badge", w: 1400, h: 1400, category: "Event" },
  { src: softecPhoto, caption: "AI Hackathon", alt: "Atiq Umer in front of the SOFTEC AI Hackathon backdrop", w: 1050, h: 1400, category: "Event" },
  { src: mobileHack, caption: "Mobile App Hackathon", alt: "Three participants seated behind laptops at a mobile app hackathon", w: 1400, h: 1050, category: "Event" },
  { src: mou, caption: "Industry MoU", alt: "Group photograph at an industry MoU occasion, with Atiq Umer standing on the right", w: 1400, h: 1096, category: "Industry" },
  { src: recognition, caption: "Industry Connection Recognition", alt: "Collage of Atiq Umer with an appreciation gift basket and a thank-you note", w: 1400, h: 1400, category: "Industry" },
  { src: samsung, caption: "Samsung Innovation Campus", alt: "Atiq Umer at the Samsung Innovation Campus entrance", w: 1400, h: 1050, category: "Training" },
  { src: googleCloud, caption: "Google Cloud Community", alt: "Atiq Umer in a photo frame at a Google Cloud developer event", w: 659, h: 878, category: "Event" },
  { src: devsincPhoto, caption: "Industry Engagement", alt: "Atiq Umer at the Devsinc office", w: 659, h: 878, category: "Industry" },
];
