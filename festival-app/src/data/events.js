import galopDerbyImg from "../assets/landing-galop-derby.png";
import musicQuizImg from "../assets/landing-music-quiz.png";
import protestsangeImg from "../assets/landing-protestsange.png";

const events = [

    {
        id: 1,
        name: "Galop Derby",
        location: "Dragonen",
        time: "12.45",
        tags: ["event", "physical", "funny"],
        description: "In the Galop Derby, beginners and amateur riders compete in speed, agility, and fun on their favorite hobby horses. Join the competition, showcase your skills, and be part of one of the most memorable hobby horse sports events.",
        image: galopDerbyImg,
    },
    {
        id: 2,
        name: "Music Quiz",
        location: "Byfesten",
        time: "14.00",
        tags: ["event", "music", "quiz"],
        description: "Join the music quiz and test your song knowledge with covers by Eläkeläiset. Guess the original songs hidden behind the band's energetic Finnish folk-inspired versions and compete with friends for the highest score.",
        image: musicQuizImg,
    },
    {
        id: 3,
        name: "Protestsange",
        location: "Birkelunden",
        time: "17.10",
        tags: ["event", "music", "sing-along"],
        description: "Protestsange is an event where people come together through music, solidarity, and shared voices. Experience powerful songs, collective singing, and an atmosphere focused on community and expression.",
        image: protestsangeImg,
    },
]