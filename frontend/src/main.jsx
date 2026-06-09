import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const initialForm = {
  nom: "",
  prenom: "",
  parcours: "",
  dateVol: "",
  telephone: "",
  email: "",
  dateNaissance: "",
  numeroPasseport: "",
  dateExpirationPasseport: "",
};

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
    <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.57.14-1.271.428-1.849Z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" viewBox="0 0 16 16">
    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
  </svg>
);

function SectionTitle({ children }) {
  return (
    <h6 style={{
      color: "#0a2d6e",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1,
      fontSize: "0.78rem",
      marginBottom: 16,
      borderBottom: "2px solid #f5a623",
      paddingBottom: 8,
    }}>
      {children}
    </h6>
  );
}

function FieldLabel({ children }) {
  return (
    <label className="form-label fw-semibold" style={{ color: "#444", fontSize: "0.9rem" }}>
      {children}
    </label>
  );
}

const inputStyle = {
  borderRadius: 10,
  border: "1px solid #ddd",
  padding: "10px 14px",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erreur");

      setSubmitted(true);
      setForm(initialForm);
    } catch {
      setError("Une erreur est survenue. Veuillez reessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewReservation = () => {
    setSubmitted(false);
  };

  return (
    <>
      <nav style={{
        background: "linear-gradient(135deg, #0a2d6e 0%, #1a4fa8 100%)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        padding: "12px 0",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              background: "linear-gradient(135deg, #f5a623 0%, #e8891a 100%)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(245,166,35,0.4)",
              color: "white",
            }}>
              <PlaneIcon />
            </div>
            <div>
              <div>
                <span style={{ color: "#f5a623", fontWeight: 800, fontSize: "1.25rem", letterSpacing: 1 }}>SAPHYR</span>
                <span style={{ color: "white", fontWeight: 300, fontSize: "1.25rem", marginLeft: 4 }}>TOURS</span>
                <span style={{ color: "white", fontWeight: 700, fontSize: "1.25rem", marginLeft: 4 }}>AFRICA</span>
              </div>
            </div>
          </a>
        </div>
      </nav>

      {!submitted && (
        <div style={{
          background: "linear-gradient(135deg, #0a2d6e 0%, #1a4fa8 60%, #2563c7 100%)",
          padding: "48px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.05,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center", color: "white", position: "relative" }}>
            <h1 style={{ fontWeight: 800, fontSize: "2.5rem", letterSpacing: -1, marginBottom: 8 }}>
              Reservation de Vol
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>
              Voyagez a travers l'Afrique et le monde avec Saphyr Tours
            </p>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", marginTop: submitted ? 48 : 24, paddingBottom: 60 }}>
        {submitted ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 60 }}>
            <div style={{ maxWidth: 600, width: "100%", background: "white", borderRadius: 24, boxShadow: "0 10px 40px rgba(0,0,0,0.2)", overflow: "hidden" }}>
              <div style={{
                background: "linear-gradient(135deg, #1a7a3a 0%, #28a745 100%)",
                padding: "48px 32px 36px",
                textAlign: "center",
              }}>
                <div style={{
                  width: 90, height: 90,
                  background: "rgba(255,255,255,0.15)",
                  border: "3px solid rgba(255,255,255,0.5)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <CheckIcon />
                </div>
                <h2 style={{ color: "white", fontWeight: 800, margin: 0, fontSize: "1.8rem" }}>
                  Reservation envoyee !
                </h2>
                <p style={{ color: "rgba(255,255,255,0.85)", marginTop: 10, marginBottom: 0, fontSize: "1rem" }}>
                  Votre demande a bien ete transmise.
                </p>
              </div>

              <div style={{ padding: "36px 40px" }}>
                <div style={{
                  background: "#f8f9ff",
                  border: "1px solid #e0e8ff",
                  borderRadius: 14,
                  padding: "20px 24px",
                  marginBottom: 28,
                }}>
                  <p style={{ color: "#444", margin: 0, lineHeight: 1.7, fontSize: "0.95rem" }}>
                    Merci pour votre confiance. Notre equipe va traiter votre demande et vous contactera
                    dans les meilleurs delais.
                  </p>
                </div>

                <button
                  onClick={handleNewReservation}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "linear-gradient(135deg, #0a2d6e, #1a4fa8)",
                    color: "white",
                    borderRadius: 12,
                    fontWeight: 700,
                    border: "none",
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(10,45,110,0.25)",
                  }}
                >
                  Faire une nouvelle reservation
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ maxWidth: 800, width: "100%", background: "white", borderRadius: 20, boxShadow: "0 10px 40px rgba(0,0,0,0.2)", overflow: "hidden" }}>
              <div style={{
                background: "linear-gradient(135deg, #f5a623 0%, #e8891a 100%)",
                padding: "20px 28px",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 12, padding: "10px 12px", color: "white" }}>
                  <ListIcon />
                </div>
                <div>
                  <h5 style={{ color: "white", fontWeight: 700, margin: 0 }}>Formulaire de Reservation</h5>
                  <small style={{ color: "rgba(255,255,255,0.85)" }}>Tous les champs sont obligatoires</small>
                </div>
              </div>

              <div style={{ padding: "28px" }}>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 24 }}>
                    <SectionTitle>Informations personnelles</SectionTitle>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <FieldLabel>Nom *</FieldLabel>
                        <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Votre nom de famille" required style={{ ...inputStyle, width: "100%" }} />
                      </div>
                      <div>
                        <FieldLabel>Prenom *</FieldLabel>
                        <input type="text" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Votre prenom" required style={{ ...inputStyle, width: "100%" }} />
                      </div>
                      <div>
                        <FieldLabel>Date de naissance *</FieldLabel>
                        <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} required style={{ ...inputStyle, width: "100%" }} />
                      </div>
                      <div>
                        <FieldLabel>Adresse e-mail *</FieldLabel>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="exemple@email.com" required style={{ ...inputStyle, width: "100%" }} />
                      </div>
                      <div>
                        <FieldLabel>Numero de telephone *</FieldLabel>
                        <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} placeholder="+221 77 XXX XX XX" required style={{ ...inputStyle, width: "100%" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <SectionTitle>Documents de voyage</SectionTitle>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <FieldLabel>Numero de passeport *</FieldLabel>
                        <input type="text" name="numeroPasseport" value={form.numeroPasseport} onChange={handleChange} placeholder="Ex : AB1234567" required style={{ ...inputStyle, width: "100%" }} />
                      </div>
                      <div>
                        <FieldLabel>Date d'expiration du passeport *</FieldLabel>
                        <input type="date" name="dateExpirationPasseport" value={form.dateExpirationPasseport} onChange={handleChange} required style={{ ...inputStyle, width: "100%" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <SectionTitle>Details du vol</SectionTitle>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <FieldLabel>Parcours *</FieldLabel>
                        <input type="text" name="parcours" value={form.parcours} onChange={handleChange} placeholder="Ex : Dakar - Paris" required style={{ ...inputStyle, width: "100%" }} />
                      </div>
                      <div>
                        <FieldLabel>Date du vol *</FieldLabel>
                        <input type="date" name="dateVol" value={form.dateVol} onChange={handleChange} required min={new Date().toISOString().split("T")[0]} style={{ ...inputStyle, width: "100%" }} />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div style={{ background: "#fff0f0", color: "#721c24", padding: "12px 16px", borderRadius: 12, marginBottom: 16 }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: "100%",
                      padding: "16px",
                      background: "linear-gradient(135deg, #0a2d6e 0%, #1a4fa8 100%)",
                      color: "white",
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: "1rem",
                      border: "none",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      opacity: isLoading ? 0.8 : 1,
                      boxShadow: "0 4px 15px rgba(10,45,110,0.3)",
                    }}
                  >
                    {isLoading ? "Traitement en cours..." : "Confirmer la reservation"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer style={{
        background: "#0a1a3d", color: "rgba(255,255,255,0.9)",
        padding: "40px 24px", fontSize: "0.95rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "24px" }}>
            <div>
              <h4 style={{ color: "#f5a623", marginBottom: "12px", fontSize: "1.1rem" }}>Lomé - Togo</h4>
              <p style={{ margin: "4px 0" }}>En face de UTB Avenou</p>
              <p style={{ margin: "4px 0" }}>+228 9287 8585</p>
              <p style={{ margin: "4px 0" }}>+228 9287 8484</p>
            </div>
            <div>
              <h4 style={{ color: "#f5a623", marginBottom: "12px", fontSize: "1.1rem" }}>Abidjan - Côte d'Ivoire</h4>
              <p style={{ margin: "4px 0" }}>+225 05 76 80 08 08</p>
            </div>
          </div>
          <div style={{ textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "24px" }}>
            <p style={{ margin: "4px 0", color: "rgba(255,255,255,0.7)" }}>contact@saphyrtours.africa</p>
            <p style={{ margin: "8px 0 0 0", color: "rgba(255,255,255,0.6)" }}>
              Copyright © {new Date().getFullYear()}, Saphyr Tours Africa. Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
