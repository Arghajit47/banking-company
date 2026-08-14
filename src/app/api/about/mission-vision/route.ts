import { NextResponse } from "next/server";

export interface MissionVisionItem {
  title: string;
  description: string;
}

export interface MissionVisionData {
  mission: MissionVisionItem;
  vision: MissionVisionItem;
}

const MISSION_VISION: MissionVisionData = {
  mission: {
    title: "Mission",
    description:
      "At YourBank, our mission is to empower our customers to achieve financial success. We are dedicated to delivering innovative banking solutions that cater to their unique needs. Through personalized services, expert guidance, and cutting-edge technology, we aim to build strong, lasting relationships with our customers. Our mission is to be their trusted partner, helping them navigate their financial journey and realize their dreams.",
  },
  vision: {
    title: "Vision",
    description:
      "Our vision at YourBank is to redefine banking by creating a seamless and personalized experience for our customers. We envision a future where banking is accessible, transparent, and tailored to individual preferences. Through continuous innovation and collaboration, we strive to be at the forefront of the industry, setting new standards for customer-centric banking. Our vision is to be the preferred financial institution, known for our unwavering commitment to excellence, trust, and customer satisfaction.",
  },
};

export async function GET(): Promise<NextResponse<MissionVisionData>> {
  return NextResponse.json(MISSION_VISION);
}
