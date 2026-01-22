import OrderDetailsClient from './OrderDetailsClient';

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <OrderDetailsClient id={resolvedParams.id} />;
}
