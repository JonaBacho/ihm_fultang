export function getStateStyles  (state)  {
    const styles = {
        Critical: {
            container: "border-l-red-600",
            badge: "bg-red-200 border-red-600 text-red-600"
        },
        Serious: {
            container: "border-l-orange-500",
            badge: "bg-orange-200 border-orange-600  text-orange-600"
        },
        "Not Critical": {
            container: "border-l-yellow-500",
            badge: "bg-yellow-200 border-yellow-600 text-yellow-600"
        },
        Stable: {
            container: "border-l-green-500",
            badge: "bg-green-200 border-green-600 text-green-600"
        },
        Improving: {
            container: "border-l-blue-500",
            badge: "bg-blue-200 border-blue-600 text-blue-600"
        }
    };

    return styles[state] || { container: "border-l-gray-300", badge: "bg-gray-100 border-gray-600 text-gray-600" };
}