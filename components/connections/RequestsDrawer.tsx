"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock3,
  Inbox,
  Send,
  X,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectConnectionRequests } from "@/features/connection-request/connection-request.selectors";
import ConnectionRequestCard from "./ConnectionRequestCard";

type Props = {
  open: boolean;
  onClose: () => void;
};

type RequestTab = "received" | "sent";

const RequestsDrawer = ({ open, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState<RequestTab>("received");

  const receivedRequests = useAppSelector(selectConnectionRequests);
  const sentRequests: any[] = [];

  const requests = activeTab === "received" ? receivedRequests : sentRequests;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close requests drawer"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-[3px]"
      />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col border-l border-white/10 bg-[#0b0c12] shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between border-b border-white/[0.07] p-6">
          <div>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.08] text-violet-300">
              <Inbox size={19} />
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-white">
              Connection requests
            </h2>

            <p className="mt-1.5 text-sm text-zinc-500">
              Manage your professional introductions.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="rounded-xl border border-white/[0.08] p-2 text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1 border-b border-white/[0.07] p-3">
          <button
            onClick={() => setActiveTab("received")}
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition ${
              activeTab === "received"
                ? "bg-violet-500/15 text-violet-200"
                : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
            }`}
          >
            <ArrowDownLeft size={16} />
            Received
            {receivedRequests.length > 0 && (
              <span className="rounded-full bg-violet-400/15 px-2 py-0.5 text-[10px] text-violet-200">
                {receivedRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("sent")}
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition ${
              activeTab === "sent"
                ? "bg-violet-500/15 text-violet-200"
                : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
            }`}
          >
            <ArrowUpRight size={16} />
            Sent
            {sentRequests.length > 0 && (
              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-zinc-300">
                {sentRequests.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="mb-5 flex items-center gap-2 text-xs text-zinc-500">
            <Clock3 size={14} />
            {activeTab === "received"
              ? "Invitations waiting for your response"
              : "Invitations you've sent"}
          </div>

          {requests.length > 0 ? (
            <div className="space-y-3">
              {activeTab === "received"
                ? receivedRequests.map((request) => (
                    <ConnectionRequestCard key={request.id} request={request} />
                  ))
                : null}
            </div>
          ) : (
            <div className="flex min-h-75 flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] text-zinc-500">
                {activeTab === "received" ? (
                  <Inbox size={25} />
                ) : (
                  <Send size={24} />
                )}
              </div>

              <h3 className="text-base font-semibold text-zinc-200">
                {activeTab === "received"
                  ? "You're all caught up"
                  : "No pending invitations"}
              </h3>

              <p className="mt-2 max-w-[270px] text-sm leading-6 text-zinc-500">
                {activeTab === "received"
                  ? "When someone wants to connect with you, their request will appear here."
                  : "Connection invitations you send will appear here until they're accepted or withdrawn."}
              </p>

              <button
                onClick={onClose}
                className="mt-5 rounded-xl border border-white/[0.09] px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.05]"
              >
                Back to discovery
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-white/[0.07] p-4">
          <p className="text-center text-xs leading-5 text-zinc-600">
            Build your network with people you know and trust.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default RequestsDrawer;
