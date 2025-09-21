import {
    PawPrint,
    Cat,
    HeartPulse,
    ShieldCheck,
    Smile,
    Users,
} from "lucide-react";


const stats = [
    {
        value: 2500,
        label: "Dogs Rehomed",
        icon: PawPrint,
    },
    {
        value: 1800,
        label: "Cats Adopted",
        icon: Cat,
    },
    {
        value: 300,
        label: "Special Needs Pets Placed",
        icon: HeartPulse,
    },
    {
        value: 500,
        label: "Senior Pets Adopted",
        icon: ShieldCheck,
    },
    {
        value: 92,
        label: "Adopter Satisfaction",
        icon: Smile,
        percentage: true,
    },
    {
        value: 100,
        label: "Volunteers",
        icon: Users,
    },
];

export { stats }