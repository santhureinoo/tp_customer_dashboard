import mixpanel, { Mixpanel } from "mixpanel"
import React from "react"

export const MixpanelContext = React.createContext<{
    mixPanelConfig: Mixpanel
}>({
    mixPanelConfig: mixpanel.init(process.env.MIXPANEL_TOKEN || '3583f33e37fcb53346be88d215695dc4')
});

export const useMixpanelContext = () => React.useContext(MixpanelContext);


export const MixpanelProvider = ({ children }: any) => {
    const mixPanelConfig = mixpanel.init(process.env.MIXPANEL_TOKEN || '3583f33e37fcb53346be88d215695dc4');
    return <MixpanelContext.Provider value={{ mixPanelConfig }}>{children}</MixpanelContext.Provider>
}