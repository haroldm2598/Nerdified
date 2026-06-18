import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface TestCardProps {
    title: string;
    desc: string;
    action: string;
    content: string;
    footer: string;
}

const TestCard = ({ title, desc, action, content, footer }: TestCardProps) => {
    return (
        <div className="max-w-96 mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{desc}</CardDescription>
                    <CardAction>{action}</CardAction>
                </CardHeader>
                <CardContent>
                    <p>{content}</p>
                </CardContent>
                <CardFooter>
                    <p>{footer}</p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default TestCard;
