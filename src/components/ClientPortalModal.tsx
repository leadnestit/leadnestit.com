import React, { useState, useEffect } from 'react';
import { X, User, Clock, CheckCircle2, AlertCircle, RefreshCw, LogIn, ExternalLink } from 'lucide-react';
import { db, auth, signInWithGoogle } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { ConsultationData } from '../types';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewConsultation: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  onNewConsultation
}) => {
  const [consultations, setConsultations] = useState<ConsultationData[]>([]);
  const [loading, setLoading] = useState(false);
  const currentUser = auth.currentUser;

  const fetchConsultations = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const q = query(
        collection(db, 'consultations'),
        where('userId', '==', currentUser.uid)
      );
      const snap = await getDocs(q);
      const results: ConsultationData[] = [];
      snap.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() } as ConsultationData);
      });
      setConsultations(results);
    } catch (err) {
      console.error('Error fetching consultations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchConsultations();
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-5 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-150 my-auto max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Client Growth Portal</h3>
            <p className="text-xs text-slate-400">
              {currentUser ? `Signed in as ${currentUser.email}` : 'Sign in to track your inquiries'}
            </p>
          </div>
        </div>

        {!currentUser ? (
          <div className="text-center py-8 space-y-4 bg-slate-950/60 p-6 rounded-xl border border-slate-800">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-cyan-400 flex items-center justify-center mx-auto">
              <LogIn className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Sign in with Google</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Track your consultation requests, review project timelines, and communicate directly with LeadNest strategists.
            </p>
            <button
              onClick={async () => {
                try {
                  await signInWithGoogle();
                } catch (e) {
                  console.error(e);
                }
              }}
              className="px-6 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mx-auto"
            >
              <LogIn className="w-4 h-4" />
              <span>Continue with Google</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                Your Consultation Requests ({consultations.length})
              </span>
              <button
                onClick={fetchConsultations}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                disabled={loading}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8 text-xs text-slate-400">
                Loading inquiries from database...
              </div>
            ) : consultations.length === 0 ? (
              <div className="text-center py-8 space-y-3 bg-slate-950/40 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-400">No active consultation requests found under your account.</p>
                <button
                  onClick={() => {
                    onClose();
                    onNewConsultation();
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  Submit a New Consultation Request
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                {consultations.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-sm font-bold text-white">{item.requiredServices}</span>
                        <p className="text-[11px] text-slate-400">{item.businessName}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {item.status || 'Pending Review'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 line-clamp-2">
                      {item.projectDetails}
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                      <span>Budget: {item.approximateBudget}</span>
                      <span>
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
