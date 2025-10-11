"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

/**
 * Componente ContactForm - Form di contatto funzionante
 *
 * Funzionalità:
 * - Validazione client-side dei campi
 * - Invio email tramite Formspree (servizio gratuito)
 * - Stati di caricamento e feedback visivi
 * - Design responsive e accessibile
 *
 * Per attivare il form:
 * 1. Registrati su https://formspree.io (gratuito)
 * 2. Crea un nuovo form e ottieni l'endpoint
 * 3. Sostituisci 'YOUR_FORM_ID' con il tuo ID Formspree
 */
export function ContactForm() {
  // Stati del form per gestire input, caricamento e messaggi di feedback
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Gestisce i cambiamenti nei campi del form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Gestisce l'invio del form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      // Validazione base dei campi obbligatori
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Compila tutti i campi obbligatori")
      }

      // Validazione formato email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error("Inserisci un indirizzo email valido")
      }

      // Invio tramite Formspree
      // IMPORTANTE: Sostituisci 'YOUR_FORM_ID' con il tuo ID Formspree
      const response = await fetch("https://formspree.io/f/mwprrjdj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Errore durante l'invio del messaggio")
      }

      // Successo! Mostra feedback positivo e resetta il form
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Nascondi il messaggio di successo dopo 5 secondi
      setTimeout(() => setStatus("idle"), 5000)
    } catch (error) {
      // Gestione errori: mostra messaggio all'utente
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Errore sconosciuto")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  return (
    <Card className="bg-card border-border hover:shadow-primary/30 hover:shadow-2xl transition-shadow duration-300">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Nome <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Il tuo nome"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === "loading"}
              className="bg-background border-border focus:border-primary"
            />
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tua.email@esempio.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === "loading"}
              className="bg-background border-border focus:border-primary"
            />
          </div>

          {/* Campo Oggetto (opzionale) */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-foreground">
              Oggetto
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="Oggetto del messaggio"
              value={formData.subject}
              onChange={handleChange}
              disabled={status === "loading"}
              className="bg-background border-border focus:border-primary"
            />
          </div>

          {/* Campo Messaggio */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">
              Messaggio <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Scrivi qui il tuo messaggio..."
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === "loading"}
              rows={5}
              className="bg-background border-border focus:border-primary resize-none"
            />
          </div>

          {/* Messaggio di Feedback (successo o errore) */}
          {status === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 dark:text-green-400">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">Messaggio inviato con successo! Ti risponderò presto.</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Pulsante Invio */}
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Invio in corso...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Invia Messaggio
              </>
            )}
          </Button>

          {/* Nota sulla privacy */}
          <p className="text-xs text-muted-foreground text-center">
            I tuoi dati saranno utilizzati solo per rispondere alla tua richiesta.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
