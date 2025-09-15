import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Save, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { insertClientSchema, type InsertClient, type Client } from "@shared/schema";

interface ClientFormProps {
  client?: Client;
  onSubmit?: (data: InsertClient) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function ClientForm({ client, onSubmit, onCancel, isLoading }: ClientFormProps) {
  const [testAdCallDate, setTestAdCallDate] = useState<Date | undefined>(
    client?.testAdCallDate ? new Date(client.testAdCallDate) : undefined
  );
  const [dateOfNextContact, setDateOfNextContact] = useState<Date | undefined>(
    client?.dateOfNextContact ? new Date(client.dateOfNextContact) : undefined
  );
  const [dateCommissionsDue, setDateCommissionsDue] = useState<Date | undefined>(
    client?.dateCommissionsDue ? new Date(client.dateCommissionsDue) : undefined
  );

  const form = useForm<InsertClient>({
    resolver: zodResolver(insertClientSchema),
    defaultValues: {
      clientName: client?.clientName || "",
      email: client?.email || "",
      phoneNumber: client?.phoneNumber || "",
      billingAddress: client?.billingAddress || "",
      reviewsOrdered: client?.reviewsOrdered || 0,
      amountPaidOnCall: client?.amountPaidOnCall || "0.00",
      nextMonthAgreedPayment: client?.nextMonthAgreedPayment || "0.00",
      notes: client?.notes || "",
    },
  });

  const handleSubmit = (data: InsertClient) => {
    const submitData = {
      ...data,
      testAdCallDate,
      dateOfNextContact,
      dateCommissionsDue,
    };
    onSubmit?.(submitData);
    console.log('Form submitted:', submitData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span data-testid="text-form-title">
            {client ? 'Edit Client' : 'Add New Client'}
          </span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onCancel}
              data-testid="button-cancel"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isLoading}
              data-testid="button-save"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Client'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  data-testid="input-client-name"
                  {...form.register("clientName")}
                  placeholder="Enter client name"
                />
                {form.formState.errors.clientName && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.clientName.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  data-testid="input-email"
                  {...form.register("email")}
                  placeholder="Enter email address"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  data-testid="input-phone"
                  {...form.register("phoneNumber")}
                  placeholder="(555) 123-4567"
                />
                {form.formState.errors.phoneNumber && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.phoneNumber.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-1">
                <Label htmlFor="billingAddress">Billing Address *</Label>
                <Textarea
                  id="billingAddress"
                  data-testid="input-billing-address"
                  {...form.register("billingAddress")}
                  placeholder="Enter billing address"
                  rows={3}
                />
                {form.formState.errors.billingAddress && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.billingAddress.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Test Ad Call Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      data-testid="button-test-ad-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {testAdCallDate ? format(testAdCallDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={testAdCallDate}
                      onSelect={setTestAdCallDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reviewsOrdered">Reviews Ordered</Label>
                <Input
                  id="reviewsOrdered"
                  type="number"
                  min="0"
                  data-testid="input-reviews-ordered"
                  {...form.register("reviewsOrdered", { valueAsNumber: true })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amountPaidOnCall">Amount Paid on Call ($)</Label>
                <Input
                  id="amountPaidOnCall"
                  type="text"
                  data-testid="input-amount-paid"
                  {...form.register("amountPaidOnCall")}
                  placeholder="0.00"
                />
                {form.formState.errors.amountPaidOnCall && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.amountPaidOnCall.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nextMonthAgreedPayment">Next Month's Agreed Payment ($)</Label>
                <Input
                  id="nextMonthAgreedPayment"
                  type="text"
                  data-testid="input-next-payment"
                  {...form.register("nextMonthAgreedPayment")}
                  placeholder="0.00"
                />
                {form.formState.errors.nextMonthAgreedPayment && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.nextMonthAgreedPayment.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Scheduling</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date of Next Contact (CSM to Client)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      data-testid="button-next-contact-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateOfNextContact ? format(dateOfNextContact, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateOfNextContact}
                      onSelect={setDateOfNextContact}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>Date Commissions Due to be Paid</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      data-testid="button-commission-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateCommissionsDue ? format(dateCommissionsDue, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateCommissionsDue}
                      onSelect={setDateCommissionsDue}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notes</h3>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                data-testid="input-notes"
                {...form.register("notes")}
                placeholder="Enter any additional notes about this client..."
                rows={4}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}