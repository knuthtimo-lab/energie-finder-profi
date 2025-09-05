# E-Mail Setup für Unternehmensanmeldungen

## Aktuelle Lösung

Die Formular-Daten werden derzeit in der Browser-Konsole geloggt. Um E-Mails an `knuth.timo@gmail.com` zu senden, haben Sie mehrere Optionen:

## Option 1: EmailJS (Empfohlen - Kostenlos)

1. Gehen Sie zu [https://www.emailjs.com/](https://www.emailjs.com/)
2. Erstellen Sie ein kostenloses Konto
3. Verbinden Sie Ihren Gmail-Account
4. Erstellen Sie eine E-Mail-Vorlage
5. Ersetzen Sie die Platzhalter in `src/lib/emailService.ts`:

```typescript
service_id: 'Ihr_Service_ID',
template_id: 'Ihr_Template_ID', 
user_id: 'Ihr_User_ID'
```

## Option 2: Webhook.site (Einfach)

1. Gehen Sie zu [https://webhook.site/](https://webhook.site/)
2. Kopieren Sie die Webhook-URL
3. Ersetzen Sie `'https://webhook.site/your-webhook-url'` in `src/lib/emailService.ts`
4. Die Daten werden an die Webhook-URL gesendet

## Option 3: Zapier (Automatisierung)

1. Erstellen Sie ein Zapier-Konto
2. Erstellen Sie einen "Webhook" Trigger
3. Verbinden Sie ihn mit Gmail
4. Verwenden Sie die Webhook-URL in der Anwendung

## Option 4: Netlify Forms (Wenn auf Netlify gehostet)

Fügen Sie `netlify` zu den Form-Attributen hinzu:

```html
<form name="company-registration" method="POST" data-netlify="true">
```

## Aktuelle Implementierung

Die Daten werden derzeit in der Browser-Konsole ausgegeben. Öffnen Sie die Entwicklertools (F12) und schauen Sie in die Konsole, um die Formular-Daten zu sehen.

## PostHog Tracking

Die folgenden Events werden getrackt:
- `company_registration_started` - Formular wird abgesendet
- `company_registration_completed` - Erfolgreiche Übermittlung
- `company_registration_failed` - Fehler bei der Übermittlung
- `experience_selected` - Erfahrungslevel ausgewählt
- `energy_type_selected` - Energieart ausgewählt
- `service_selected` - Service ausgewählt
