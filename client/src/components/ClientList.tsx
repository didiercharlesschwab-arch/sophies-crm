import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter } from "lucide-react";
import ClientCard from "./ClientCard";
import { type Client } from "@shared/schema";

interface ClientListProps {
  clients: Client[];
  onAddClient?: () => void;
  onEditClient?: (client: Client) => void;
  onDeleteClient?: (clientId: string) => void;
  isLoading?: boolean;
}

export default function ClientList({ 
  clients, 
  onAddClient, 
  onEditClient, 
  onDeleteClient, 
  isLoading 
}: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterStatus, setFilterStatus] = useState("all");

  const getDateStatus = (date: Date | string | null) => {
    if (!date) return "neutral";
    const targetDate = new Date(date);
    const today = new Date();
    const diffDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "overdue";
    if (diffDays <= 7) return "due-soon";
    return "upcoming";
  };

  const filteredClients = clients
    .filter(client => {
      // Search filter
      const matchesSearch = 
        client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phoneNumber.includes(searchTerm);
      
      if (!matchesSearch) return false;

      // Status filter
      if (filterStatus === "all") return true;
      
      const nextContactStatus = getDateStatus(client.dateOfNextContact);
      const commissionStatus = getDateStatus(client.dateCommissionsDue);
      
      switch (filterStatus) {
        case "overdue":
          return nextContactStatus === "overdue" || commissionStatus === "overdue";
        case "due-soon":
          return nextContactStatus === "due-soon" || commissionStatus === "due-soon";
        case "upcoming":
          return nextContactStatus === "upcoming" && commissionStatus === "upcoming";
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.clientName.localeCompare(b.clientName);
        case "amount":
          return parseFloat(b.amountPaidOnCall || "0") - parseFloat(a.amountPaidOnCall || "0");
        case "next-contact":
          if (!a.dateOfNextContact && !b.dateOfNextContact) return 0;
          if (!a.dateOfNextContact) return 1;
          if (!b.dateOfNextContact) return -1;
          return new Date(a.dateOfNextContact).getTime() - new Date(b.dateOfNextContact).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span data-testid="text-client-count">
                Clients ({filteredClients.length})
              </span>
              {isLoading && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              )}
            </div>
            <Button onClick={onAddClient} data-testid="button-add-client">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="amount">Amount Paid</SelectItem>
                  <SelectItem value="next-contact">Next Contact</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40" data-testid="select-filter">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="due-soon">Due Soon</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Cards Grid */}
      {filteredClients.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground" data-testid="text-no-clients">
              {searchTerm || filterStatus !== "all" 
                ? "No clients match your search criteria." 
                : "No clients yet. Add your first client to get started."}
            </div>
            {(!searchTerm && filterStatus === "all") && (
              <Button 
                className="mt-4" 
                onClick={onAddClient}
                data-testid="button-add-first-client"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Client
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onEdit={onEditClient}
              onDelete={onDeleteClient}
            />
          ))}
        </div>
      )}
    </div>
  );
}