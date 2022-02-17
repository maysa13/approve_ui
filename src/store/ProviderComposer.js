import React, { cloneElement } from "react"

//impoart providers
import { AuthProvider } from './AuthContext.js'
// import { DocInstallProvider } from './DocInstallContext.js'

function ProviderComposer({ contexts, children }) {
  return contexts.reduce(
    (kids, parent) =>
      cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

export default function ContextProvider({ children }) {
  return (
    <ProviderComposer
      // add providers to array of contexts
      contexts={[
        <AuthProvider />,
        // <DocInstallProvider />
      ]}
    >
      {children}
    </ProviderComposer>
  );
}