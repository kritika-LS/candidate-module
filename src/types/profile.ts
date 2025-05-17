// ----- Type Definitions -----
export type Route = {
    key: string;
    title: string;
    icon: string;
};

export type AccordionItem = {
    title: string;
    completed: boolean;
    content: React.ReactNode;
    icon: string;
};
