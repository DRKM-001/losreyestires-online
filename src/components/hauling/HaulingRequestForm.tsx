'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Check, CheckCircle, Loader2, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const TIRE_TYPES = ['Passenger', 'Light truck', 'SUV', 'Commercial', 'Specialty', 'Mixed / other'];

const FREQUENCY_LABELS: Record<string, string> = {
  'one-time': 'One-time cleanup',
  weekly: 'Weekly',
  'bi-weekly': 'Bi-weekly',
  monthly: 'Monthly',
  'on-call': 'On-call / as needed',
};

const PAYMENT_LABELS: Record<string, string> = {
  'per-service': 'Pay per pickup (card/cash)',
  cod: 'COD',
  'net-terms': 'Requesting net terms (Net 15/30)',
};

interface SubmittedSummary {
  business: string;
  pickup: string;
}

const selectClassName =
  'h-11 w-full rounded-md border border-input bg-white px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

const checkboxClassName =
  'size-4 shrink-0 accent-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2';

function fieldValue(formData: FormData, name: string): string {
  return String(formData.get(name) || '').trim();
}

export function HaulingRequestForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [tireTypes, setTireTypes] = useState<string[]>([]);
  const [billingSame, setBillingSame] = useState(true);
  const [pickupSame, setPickupSame] = useState(true);
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState<SubmittedSummary | null>(null);

  function toggleTireType(type: string) {
    setFormError('');
    setTireTypes((previous) =>
      previous.includes(type) ? previous.filter((entry) => entry !== type) : [...previous, type]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');

    if (tireTypes.length === 0) {
      setFormError('Select at least one tire type so we know what we are picking up.');
      return;
    }

    setStatus('submitting');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const legalName = fieldValue(formData, 'legalName');
    const dba = fieldValue(formData, 'dba');
    const entityType = fieldValue(formData, 'entityType');
    const ein = fieldValue(formData, 'ein');
    const yearsInBusiness = fieldValue(formData, 'yearsInBusiness');
    const website = fieldValue(formData, 'website');
    const street = fieldValue(formData, 'street');
    const city = fieldValue(formData, 'city');
    const state = fieldValue(formData, 'state');
    const zip = fieldValue(formData, 'zip');
    const contactTitle = fieldValue(formData, 'contactTitle');
    const tireCount = fieldValue(formData, 'tireCount');
    const frequency = fieldValue(formData, 'frequency');
    const payment = fieldValue(formData, 'payment');
    const accessNotes = fieldValue(formData, 'accessNotes');
    const notes = fieldValue(formData, 'notes');

    const businessAddress = `${street}, ${city}, ${state} ${zip}`;

    const pickupLine = pickupSame
      ? 'Pickup location: Same as business address'
      : `Pickup location: ${fieldValue(formData, 'pickupStreet')}, ${fieldValue(formData, 'pickupCity')}, ${fieldValue(formData, 'pickupState')} ${fieldValue(formData, 'pickupZip')}`;

    const pickupSummary = [
      tireTypes.join(', '),
      tireCount && `about ${tireCount} tires`,
      FREQUENCY_LABELS[frequency],
    ].filter(Boolean).join(' · ');

    const billingLines = billingSame
      ? ['Billing contact: Same as primary contact']
      : [
          `Billing contact: ${fieldValue(formData, 'billingName')}`,
          fieldValue(formData, 'billingPhone') && `Billing phone: ${fieldValue(formData, 'billingPhone')}`,
          `Billing email: ${fieldValue(formData, 'billingEmail')}`,
        ];

    const additionalInfo = [
      '— BUSINESS —',
      `Legal name: ${legalName}`,
      dba && `DBA: ${dba}`,
      entityType && `Entity type: ${entityType}`,
      ein && `EIN: ${ein}`,
      yearsInBusiness && `Years in business: ${yearsInBusiness}`,
      website && `Website: ${website}`,
      `Business address: ${businessAddress}`,
      '— PRIMARY CONTACT —',
      contactTitle && `Title / role: ${contactTitle}`,
      '— BILLING & ACCOUNTING —',
      ...billingLines,
      PAYMENT_LABELS[payment] && `Payment preference: ${PAYMENT_LABELS[payment]}`,
      '— TIRE PICKUP —',
      `Tire types: ${tireTypes.join(', ')}`,
      tireCount && `Estimated tires per pickup: ${tireCount}`,
      FREQUENCY_LABELS[frequency] && `Pickup frequency: ${FREQUENCY_LABELS[frequency]}`,
      pickupLine,
      accessNotes && `Site access: ${accessNotes}`,
      notes && `Timing / notes:\n${notes}`,
      '—',
      'Submitter certified the information is accurate and that they are authorized to request this on behalf of the business.',
    ].filter(Boolean).join('\n').slice(0, 2000);

    try {
      const response = await fetch('/api/rfi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fieldValue(formData, 'name'),
          email: fieldValue(formData, 'email'),
          phone: fieldValue(formData, 'phone'),
          tireCondition: 'hauling',
          searchType: 'custom',
          vehicleInfo: null,
          sizeInfo: null,
          additionalInfo,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Hauling application failed');
      }

      setSubmitted({ business: dba || legalName, pickup: pickupSummary });
      form.reset();
      setTireTypes([]);
      setBillingSame(true);
      setPickupSame(true);
      setStatus('success');
    } catch (error) {
      console.error('Hauling application submission failed:', error);
      setStatus('error');
      setFormError('We could not send your application. Please try again or call 619-440-6098.');
    }
  }

  if (status === 'success' && submitted) {
    return (
      <div role="status" className="py-6 text-center sm:py-10">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>
        </div>
        <h2 className="mt-5 text-2xl font-bold text-zinc-950">Application received</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600">
          Thanks — {submitted.business || 'your business'} is on the shop&apos;s list. We&apos;ll review the details and reach out directly to confirm pickup scheduling and pricing.
        </p>
        <div className="mx-auto mt-6 max-w-sm rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Pickup</p>
          <p className="mt-1 text-sm font-medium text-zinc-900">{submitted.pickup}</p>
        </div>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline" className="h-11 font-bold">
            <Link href="/hauling">Back to tire hauling</Link>
          </Button>
          <Button asChild variant="outline" className="h-11 font-bold">
            <a href="tel:619-440-6098">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call the shop
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <fieldset className="space-y-4">
        <legend className="sr-only">Business information</legend>
        <p aria-hidden="true" className="text-lg font-bold text-zinc-950">Business information</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hauling-form-legal">Legal business name *</Label>
            <Input id="hauling-form-legal" name="legalName" autoComplete="organization" required maxLength={120} placeholder="Registered name" className="h-11 bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hauling-form-dba">DBA / trade name</Label>
            <Input id="hauling-form-dba" name="dba" maxLength={80} placeholder="If different (optional)" className="h-11 bg-white" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="hauling-form-entity">Entity type</Label>
            <select id="hauling-form-entity" name="entityType" defaultValue="" className={selectClassName}>
              <option value="">Select (optional)</option>
              <option value="LLC">LLC</option>
              <option value="Corporation">Corporation</option>
              <option value="Sole proprietorship">Sole proprietorship</option>
              <option value="Partnership">Partnership</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hauling-form-ein">EIN</Label>
            <Input id="hauling-form-ein" name="ein" inputMode="numeric" maxLength={12} placeholder="XX-XXXXXXX" className="h-11 bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hauling-form-years">Years in business</Label>
            <Input id="hauling-form-years" name="yearsInBusiness" inputMode="numeric" maxLength={4} placeholder="E.g., 12" className="h-11 bg-white" />
          </div>
        </div>
        <p className="text-xs leading-5 text-zinc-500">EIN is optional — needed only if you want invoicing or net-terms billing.</p>

        <div className="space-y-2">
          <Label htmlFor="hauling-form-street">Business street address *</Label>
          <Input id="hauling-form-street" name="street" autoComplete="street-address" required maxLength={120} placeholder="Street and number" className="h-11 bg-white" />
        </div>

        <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-2">
            <Label htmlFor="hauling-form-city">City *</Label>
            <Input id="hauling-form-city" name="city" autoComplete="address-level2" required maxLength={60} className="h-11 bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hauling-form-state">State *</Label>
            <Input id="hauling-form-state" name="state" autoComplete="address-level1" required maxLength={20} defaultValue="CA" className="h-11 bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hauling-form-zip">ZIP *</Label>
            <Input id="hauling-form-zip" name="zip" autoComplete="postal-code" inputMode="numeric" required maxLength={10} className="h-11 bg-white" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hauling-form-website">Website</Label>
          <Input id="hauling-form-website" name="website" inputMode="url" autoComplete="url" maxLength={100} placeholder="yourcompany.com (optional)" className="h-11 bg-white" />
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-t border-zinc-200 pt-6">
        <legend className="sr-only">Primary contact</legend>
        <p aria-hidden="true" className="text-lg font-bold text-zinc-950">Primary contact</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hauling-form-name">Full name *</Label>
            <Input id="hauling-form-name" name="name" autoComplete="name" required maxLength={100} placeholder="Your name" className="h-11 bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hauling-form-title">Title / role</Label>
            <Input id="hauling-form-title" name="contactTitle" maxLength={60} placeholder="E.g., Shop manager (optional)" className="h-11 bg-white" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hauling-form-phone">Phone *</Label>
            <Input id="hauling-form-phone" name="phone" type="tel" autoComplete="tel" required maxLength={40} placeholder="(619) 555-1234" className="h-11 bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hauling-form-email">Email *</Label>
            <Input id="hauling-form-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" className="h-11 bg-white" />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-t border-zinc-200 pt-6">
        <legend className="sr-only">Billing &amp; accounting</legend>
        <p aria-hidden="true" className="text-lg font-bold text-zinc-950">Billing &amp; accounting</p>

        <label className="flex items-center gap-3 text-sm font-medium text-zinc-900">
          <input
            type="checkbox"
            checked={billingSame}
            onChange={(event) => setBillingSame(event.target.checked)}
            className={checkboxClassName}
          />
          Billing contact is the same as the primary contact
        </label>

        {!billingSame && (
          <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hauling-form-billing-name">Billing contact name *</Label>
                <Input id="hauling-form-billing-name" name="billingName" required={!billingSame} maxLength={100} placeholder="Accounts payable contact" className="h-11 bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hauling-form-billing-phone">Billing phone</Label>
                <Input id="hauling-form-billing-phone" name="billingPhone" type="tel" maxLength={40} placeholder="(619) 555-1234" className="h-11 bg-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hauling-form-billing-email">Billing email *</Label>
              <Input id="hauling-form-billing-email" name="billingEmail" type="email" required={!billingSame} maxLength={254} placeholder="ap@company.com" className="h-11 bg-white" />
            </div>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm font-medium text-zinc-900">How do you expect to pay?</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {Object.entries(PAYMENT_LABELS).map(([value, label]) => (
              <label
                key={value}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border-2 border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-red-400 has-checked:border-red-600 has-checked:bg-red-50"
              >
                <input
                  type="radio"
                  name="payment"
                  value={value}
                  defaultChecked={value === 'per-service'}
                  className={checkboxClassName}
                />
                {label}
              </label>
            ))}
          </div>
          <p className="text-xs leading-5 text-zinc-500">Net terms are subject to review — the shop will follow up with details.</p>
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-t border-zinc-200 pt-6">
        <legend className="sr-only">Tire pickup details</legend>
        <p aria-hidden="true" className="text-lg font-bold text-zinc-950">Tire pickup details</p>

        <div className="space-y-3">
          <p className="text-sm font-medium text-zinc-900">Tire types *</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {TIRE_TYPES.map((type) => {
              const selected = tireTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleTireType(type)}
                  className={`flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 ${
                    selected
                      ? 'border-red-600 bg-red-600 text-white'
                      : 'border-zinc-300 bg-white text-zinc-900 hover:border-red-400 hover:bg-red-50'
                  }`}
                >
                  {selected && <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />}
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hauling-form-count">About how many tires per pickup?</Label>
            <Input id="hauling-form-count" name="tireCount" inputMode="numeric" maxLength={10} placeholder="E.g., 150" className="h-11 bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hauling-form-frequency">Pickup frequency</Label>
            <select id="hauling-form-frequency" name="frequency" defaultValue="" className={selectClassName}>
              <option value="">Not sure yet</option>
              <option value="one-time">One-time cleanup</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="on-call">On-call / as needed</option>
            </select>
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-zinc-900">
          <input
            type="checkbox"
            checked={pickupSame}
            onChange={(event) => setPickupSame(event.target.checked)}
            className={checkboxClassName}
          />
          Pickup location is the same as the business address
        </label>

        {!pickupSame && (
          <div className="space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <div className="space-y-2">
              <Label htmlFor="hauling-form-pickup-street">Pickup street address *</Label>
              <Input id="hauling-form-pickup-street" name="pickupStreet" required={!pickupSame} maxLength={120} placeholder="Street and number" className="h-11 bg-white" />
            </div>
            <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
              <div className="space-y-2">
                <Label htmlFor="hauling-form-pickup-city">City *</Label>
                <Input id="hauling-form-pickup-city" name="pickupCity" required={!pickupSame} maxLength={60} className="h-11 bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hauling-form-pickup-state">State *</Label>
                <Input id="hauling-form-pickup-state" name="pickupState" required={!pickupSame} maxLength={20} defaultValue="CA" className="h-11 bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hauling-form-pickup-zip">ZIP *</Label>
                <Input id="hauling-form-pickup-zip" name="pickupZip" required={!pickupSame} inputMode="numeric" maxLength={10} className="h-11 bg-white" />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="hauling-form-access">Site access</Label>
          <Input id="hauling-form-access" name="accessNotes" maxLength={150} placeholder="E.g., rear alley, gate code, dock height (optional)" className="h-11 bg-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hauling-form-notes">Timing &amp; notes</Label>
          <Textarea
            id="hauling-form-notes"
            name="notes"
            rows={3}
            maxLength={500}
            placeholder="When do you need the first pickup, and anything else we should know?"
            className="min-h-20 resize-y bg-white"
          />
        </div>
      </fieldset>

      <div className="space-y-4 border-t border-zinc-200 pt-6">
        <label className="flex items-start gap-3 text-sm leading-6 text-zinc-700">
          <input type="checkbox" required className={`${checkboxClassName} mt-1`} />
          I certify that this information is accurate and that I am authorized to request tire hauling service on behalf of this business.
        </label>

        {formError && (
          <p role="alert" className="text-sm font-medium text-red-700">{formError}</p>
        )}

        <Button
          type="submit"
          className="h-12 w-full bg-red-600 font-bold hover:bg-red-700"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {status === 'submitting' ? 'Sending...' : 'Submit Hauling Application'}
        </Button>

        <p className="text-center text-xs leading-5 text-zinc-500">
          We only use these details to review and respond to this application. Never include bank or card numbers here.
        </p>
      </div>
    </form>
  );
}
