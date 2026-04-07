import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaRocket, 
  FaUsers, 
  FaEnvelopeOpenText, 
  FaDollarSign, 
  FaRobot, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaChartLine,
  FaLock,
  FaUserAlt,
  FaClock
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 Minutos de inactividad absoluta

// --- COMPONENTES AUXILIARES ---
const StatCard = ({ title, value, icon, color, delta }) => (
  <motion.div 
    whileHover={{ y: -5, borderColor: color }}
    className="p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 rounded-lg bg-white/5 text-xl" style={{ color }}>
        {icon}
      </div>
      {delta && (
        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
          {delta}
        </span>
      )}
    </div>
    <h3 className="text-white/50 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
  </motion.div>
);

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ leads: [], stats: null, aiStatus: null });
  const [sessionExpired, setSessionExpired] = useState(false);
  
  const timeoutRef = useRef(null);

  // 1. Manejo de Inactividad
  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isAuthenticated) {
      timeoutRef.current = setTimeout(() => {
        handleLogout(true); // Cerrar sesión por inactividad
      }, INACTIVITY_LIMIT);
    }
  };

  useEffect(() => {
    // Escuchar eventos de usuario para resetear el timer
    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];
    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isAuthenticated]);

  // 2. Verificar sesión al cargar (sessionStorage para máxima seguridad al cerrar pestaña)
  useEffect(() => {
    const token = sessionStorage.getItem("dts_dashboard_token");
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData(token);
    } else {
      setLoading(false);
    }
  }, []);

  // 3. Función para traer datos protegidos
  const fetchDashboardData = async (token) => {
    try {
      const headers = { "X-Dashboard-Token": token };
      const [leadsRes, statsRes, aiRes] = await Promise.all([
        fetch(`${API_URL}/api/leads`, { headers }),
        fetch(`${API_URL}/api/stats`, { headers }),
        fetch(`${API_URL}/api/ai-status`, { headers })
      ]);
      
      if (leadsRes.status === 401) {
        handleLogout();
        return;
      }

      const leads = await leadsRes.json();
      const stats = await statsRes.json();
      const aiStatus = await aiRes.json();
      
      setData({ leads, stats, aiStatus });
      setIsAuthenticated(true);
      resetTimer(); // Iniciar timer de inactividad
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // 4. Manejo de Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSessionExpired(false);
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass })
      });

      if (res.ok) {
        const result = await res.json();
        sessionStorage.setItem("dts_dashboard_token", result.token);
        fetchDashboardData(result.token);
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  const handleLogout = (expired = false) => {
    sessionStorage.removeItem("dts_dashboard_token");
    setIsAuthenticated(false);
    setData({ leads: [], stats: null, aiStatus: null });
    setUser("");
    setPass("");
    if (expired) setSessionExpired(true);
  };

  // --- VISTA DE LOGIN CON PROTECCIÓN ---
  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 select-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Luz de fondo sutil */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full" />
          
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-inner">
              <FaLock className="text-amber-500" size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white">DTS&DOG <span className="text-amber-500">SECURE</span></h1>
            {sessionExpired ? (
              <p className="text-amber-500/80 text-xs font-bold mt-3 flex items-center justify-center gap-2">
                <FaClock /> SESIÓN CERRADA POR INACTIVIDAD
              </p>
            ) : (
              <p className="text-white/40 text-sm mt-2">Acceso restringido a nivel administrativo.</p>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div className="relative">
              <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={12} />
              <input 
                type="text" 
                placeholder="Usuario"
                autoComplete="off"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:border-amber-500/50 outline-none transition-all"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={12} />
              <input 
                type="password" 
                placeholder="Contraseña"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:border-amber-500/50 outline-none transition-all"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest bg-red-500/10 py-2 rounded-lg">
                {error}
              </motion.p>
            )}

            <button 
              type="submit"
              className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-amber-500 hover:text-white transition-all active:scale-95 shadow-lg"
            >
              ACCEDER AL PANEL
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-[9px] text-white/10 uppercase tracking-[0.3em] font-bold">End-to-End Encryption Enabled</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- VISTA CARGANDO ---
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-2 border-white/10 border-t-amber-500 rounded-full"
      />
    </div>
  );

  // --- VISTA DASHBOARD (PROTEGIDA) ---
  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24 pb-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header con Logout Seguro */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">
              DTS&DOG <span className="text-gradient">Control Center</span>
            </h1>
            <div className="flex items-center gap-3">
               <span className="text-white/40 font-medium">Operador: <span className="text-white/80">{user || "Germanovct"}</span></span>
               <div className="w-1 h-1 rounded-full bg-white/20" />
               <button 
                  onClick={() => handleLogout()} 
                  className="text-[10px] font-black text-amber-500/50 hover:text-amber-500 uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  <FaLock size={8} /> Salida Segura
                </button>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-lg backdrop-blur-xl">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-2" />
             <span className="text-xs font-bold text-white/70 mr-2 uppercase tracking-widest">Pipeline Activo</span>
          </div>
        </div>

        {/* Dash Body (Igual al anterior pero con datos data.stats) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Leads CRM" value={data.stats?.leads_totales || "0"} icon={<FaUsers />} color="#f59e0b" />
          <StatCard title="Contactados" value={data.stats?.leads_contactados || "0"} icon={<FaEnvelopeOpenText />} color="#3b82f6" />
          <StatCard title="Respuestas" value={data.stats?.leads_respondieron || "0"} icon={<FaChartLine />} color="#10b981" />
          <StatCard title="Potencial" value={`$${data.stats?.potencial_revenue?.toLocaleString() || "0"}`} icon={<FaDollarSign />} color="#f59e0b" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.01] overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.02]">
              <h2 className="font-bold text-lg">Historial de Prospección</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-white/40">
                  <tr>
                    <th className="p-4 pl-6">Prospecto</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Score</th>
                    <th className="p-4 text-right pr-6">Acción</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {data.leads.map((lead, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6 font-bold">{lead.nombre}</td>
                      <td className="p-4">
                        <span className="text-[10px] font-black uppercase bg-white/10 px-2 py-1 rounded">{lead.status}</span>
                      </td>
                      <td className="p-4 font-mono text-amber-500">{lead.score || 0}%</td>
                      <td className="p-4 text-right pr-6">
                         <button className="text-[9px] font-black text-white/30 hover:text-white uppercase tracking-widest">Ver Detalles</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="rounded-2xl border border-white/10 bg-white/[0.01] p-6 space-y-6">
             <h2 className="font-bold text-lg">IA Health</h2>
             {data.aiStatus && Object.entries(data.aiStatus).map(([name, status]) => (
                <div key={name} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                   <span className="text-xs font-bold text-white/60 uppercase">{name.split(' ')[0]}</span>
                   <FaCheckCircle className={status.includes('✅') ? "text-emerald-500" : "text-white/10"} size={12} />
                </div>
             ))}
          </div>
        </div>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(to right, #f59e0b, #fff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        ::selection {
          background: #f59e0b;
          color: #000;
        }
      `}</style>
    </div>
  );
}
