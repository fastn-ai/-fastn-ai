import React, { useEffect, useRef } from "react";

export interface WidgetProps {
    widgetDomain?: string;
    projectId: string;
    tenantId?: string;
    authToken: string;
    theme?: "light" | "dark";
    apiKey?: string;
    env?: string;
    customAuth?: boolean;
}

const Widget: React.FC<WidgetProps> = ({
    widgetDomain = "https://live.fastn.ai/widget",
    projectId,
    tenantId = "",
    authToken,
    theme = "light",
    apiKey = "",
    env = "LIVE",
    customAuth = true,
}) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const origin = encodeURIComponent(window.location.origin);
    const path = encodeURIComponent(
        window.location.pathname + window.location.search
    );

    useEffect(() => {
        const handleIframeLoad = () => {
            iframeRef.current?.contentWindow?.postMessage(
                {
                    eventType: "update_fastn_auth_token",
                    authToken,
                },
                widgetDomain
            );
        };

        const iframe = iframeRef.current;
        if (iframe) iframe.addEventListener("load", handleIframeLoad);
        return () => {
            if (iframe) iframe.removeEventListener("load", handleIframeLoad);
        };
    }, [authToken, widgetDomain]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.eventType === "update_fastn_iframe_height") {
                const iframe = iframeRef?.current;
                const height = event?.data?.height;
                if (iframe) iframe.style.height = height + "px";
            }
        };

        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [widgetDomain]);

    return React.createElement("iframe", {
        ref: iframeRef,
        src: `${widgetDomain}?origin=${origin}&path=${path}&customAuth=${customAuth}&projectId=${projectId}&tenantId=${tenantId}&theme=${theme}&apiKey=${apiKey}&env=${env}`,
        title: "Fastn Widget",
        width: "100%",
        style: { minHeight: "300px" },
    });
};