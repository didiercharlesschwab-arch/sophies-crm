import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Plus } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import ClientList from "@/components/ClientList";
import ClientForm from "@/components/ClientForm";
import ThemeToggle from "@/components/ThemeToggle";
import { type Client, type InsertClient } from "@shared/schema";
import NotFound from "@/pages/not-found";

type ViewType = "dashboard" | "clients" | "add-client" | "edit-client";

function Router() {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [editingClient, setEditingClient] = useState<Client | undefined>();
  
  //todo: remove mock functionality
  const [clients, setClients] = useState<Client[]>([
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
  ]);

  const handleAddClient = () => {
    setEditingClient(undefined);
    setCurrentView("add-client");
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setCurrentView("edit-client");
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
    console.log('Client deleted:', clientId);
  };

  const handleSubmitClient = (data: InsertClient) => {
    if (editingClient) {
      // Edit existing client
      setClients(prev => prev.map(c => 
        c.id === editingClient.id 
          ? { ...editingClient, ...data }
          : c
      ));
      console.log('Client updated:', data);
    } else {
      // Add new client
      const newClient: Client = {
        id: Date.now().toString(),
        ...data,
      };
      setClients(prev => [...prev, newClient]);
      console.log('New client added:', data);
    }
    setCurrentView("clients");
  };

  const handleCancelForm = () => {
    setEditingClient(undefined);
    setCurrentView("clients");
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard clients={clients} />;
      case "clients":
        return (
          <ClientList
            clients={clients}
            onAddClient={handleAddClient}
            onEditClient={handleEditClient}
            onDeleteClient={handleDeleteClient}
          />
        );
      case "add-client":
      case "edit-client":
        return (
          <ClientForm
            client={editingClient}
            onSubmit={handleSubmitClient}
            onCancel={handleCancelForm}
          />
        );
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <h1 className="text-3xl font-bold text-foreground tracking-tight" data-testid="text-app-title">
                Sophie's CRM
              </h1>
              
              {/* Navigation */}
              <nav className="flex gap-2">
                <Button
                  variant={currentView === "dashboard" ? "default" : "ghost"}
                  size="sm"
                  className="font-medium"
                  onClick={() => setCurrentView("dashboard")}
                  data-testid="nav-dashboard"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant={currentView === "clients" ? "default" : "ghost"}
                  size="sm"
                  className="font-medium"
                  onClick={() => setCurrentView("clients")}
                  data-testid="nav-clients"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Clients
                </Button>
                <Button
                  variant={currentView === "add-client" || currentView === "edit-client" ? "default" : "ghost"}
                  size="sm"
                  className="font-medium"
                  onClick={handleAddClient}
                  data-testid="nav-add-client"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </nav>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
