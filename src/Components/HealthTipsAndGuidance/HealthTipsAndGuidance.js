import React from "react";
import "./HealthTipsAndGuidance.css";

const tips = [
  {
    title: "Stay Hydrated",
    text: "Aim for 6–8 glasses of water a day. Sip regularly rather than drinking a lot at once, and keep a bottle near you while working or studying."
  },
  {
    title: "Move Your Body",
    text: "Try to get at least 30 minutes of light activity most days – a walk, stretching, or a quick home workout all count."
  },
  {
    title: "Prioritize Sleep",
    text: "Stick to a regular sleep schedule and aim for 7–9 hours. Avoid screens and heavy meals for at least an hour before bed."
  },
  {
    title: "Eat Colorful Meals",
    text: "Fill half your plate with fruits and vegetables. Color usually means more vitamins, minerals, and fiber."
  },
  {
    title: "Take Breaks From Screens",
    text: "Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain."
  },
  {
    title: "Check In With Yourself",
    text: "Notice how you’re feeling physically and mentally. A few deep breaths or a short walk can help reset during a stressful day."
  }
];

const HealthTipsAndGuidance = () => {
  return (
    <section className="health-tips-wrapper">
      <div className="health-tips-header">
        <h1>Health Tips &amp; Guidance</h1>
        <p>
          Small daily habits make a big difference. Here are a few simple tips
          you can start using today to support your overall wellbeing.
        </p>
      </div>

      <div className="health-tips-grid">
        {tips.map((tip) => (
          <div className="health-tip-card" key={tip.title}>
            <div className="health-tip-icon">💡</div>
            <h3>{tip.title}</h3>
            <p>{tip.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HealthTipsAndGuidance;
