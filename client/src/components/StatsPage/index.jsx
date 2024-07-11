import { useQuery } from '@tanstack/react-query';

//COMPONENT that displays the stats
export default function StatsPage() {
    return <div>{genreListQuery()}</div>
}

function genreListQuery() {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['genrelist'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3002/api/get/genrelist');
            if(!response.ok) {
                throw new Error('genre query failed')
            }
            return response.json()
        },
        refetchOnMount: true
    })
    console.log(data);
    if (isPending) {
        return <span>Loading...</span>
    }
    if (isError) {
        return <span>Error: {error.message}</span>
    }
    return (
            <p>printed to console</p>
    )
}