import { useState, useEffect } from "react";

export function useFetchAPI<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch data");

                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}
