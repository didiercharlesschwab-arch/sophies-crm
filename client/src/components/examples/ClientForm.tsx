import ClientForm from '../ClientForm';
import { type InsertClient } from '@shared/schema';

export default function ClientFormExample() {
  const handleSubmit = (data: InsertClient) => {
    console.log('Form submitted with data:', data);
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <div className="p-4">
      <ClientForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={false}
      />
    </div>
  );
}