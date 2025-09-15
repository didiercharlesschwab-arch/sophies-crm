import ClientCard from '../ClientCard';
import { type Client } from '@shared/schema';

export default function ClientCardExample() {
  //todo: remove mock functionality
  const mockClient: Client = {
    id: '1',
    clientName: 'Acme Corporation',
    email: 'contact@acme.com',
    phoneNumber: '(555) 123-4567',
    billingAddress: '123 Business St, Suite 100, New York, NY 10001',
    testAdCallDate: new Date('2024-01-15'),
    reviewsOrdered: 25,
    amountPaidOnCall: '2500.00',
    nextMonthAgreedPayment: '3500.00',
    dateOfNextContact: new Date('2024-02-01'),
    dateCommissionsDue: new Date('2024-01-31'),
    notes: 'Very responsive client. Interested in expanding their marketing budget next quarter. Follow up on additional service packages.'
  };

  const handleEdit = (client: Client) => {
    console.log('Edit client triggered:', client.clientName);
  };

  const handleDelete = (clientId: string) => {
    console.log('Delete client triggered:', clientId);
  };

  return (
    <div className="p-4 max-w-md">
      <ClientCard 
        client={mockClient} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}