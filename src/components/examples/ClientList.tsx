import ClientList from '../ClientList';
import { type Client } from '@shared/schema';

export default function ClientListExample() {
  //todo: remove mock functionality
  const mockClients: Client[] = [
    {
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
      notes: 'Very responsive client. Interested in expanding their marketing budget next quarter.'
    },
    {
      id: '2',
      clientName: 'Tech Solutions Inc',
      email: 'info@techsolutions.com',
      phoneNumber: '(555) 987-6543',
      billingAddress: '456 Tech Avenue, Silicon Valley, CA 94101',
      testAdCallDate: new Date('2024-01-20'),
      reviewsOrdered: 15,
      amountPaidOnCall: '1800.00',
      nextMonthAgreedPayment: '2200.00',
      dateOfNextContact: new Date('2024-01-28'),
      dateCommissionsDue: new Date('2024-02-15'),
      notes: 'Looking for long-term partnership. Discuss volume discounts.'
    },
    {
      id: '3',
      clientName: 'Global Marketing Group',
      email: 'hello@globalmarketing.com',
      phoneNumber: '(555) 456-7890',
      billingAddress: '789 Marketing Blvd, Chicago, IL 60601',
      testAdCallDate: new Date('2024-01-10'),
      reviewsOrdered: 50,
      amountPaidOnCall: '5000.00',
      nextMonthAgreedPayment: '6000.00',
      dateOfNextContact: new Date('2024-01-25'),
      dateCommissionsDue: new Date('2024-01-20'),
      notes: 'Premium client. Always pays on time. Consider offering exclusive packages.'
    }
  ];

  const handleAddClient = () => {
    console.log('Add client triggered');
  };

  const handleEditClient = (client: Client) => {
    console.log('Edit client triggered:', client.clientName);
  };

  const handleDeleteClient = (clientId: string) => {
    console.log('Delete client triggered:', clientId);
  };

  return (
    <div className="p-4">
      <ClientList 
        clients={mockClients}
        onAddClient={handleAddClient}
        onEditClient={handleEditClient}
        onDeleteClient={handleDeleteClient}
        isLoading={false}
      />
    </div>
  );
}