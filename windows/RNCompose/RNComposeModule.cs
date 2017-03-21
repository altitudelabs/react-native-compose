using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Com.Reactlibrary.RNCompose
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNComposeModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNComposeModule"/>.
        /// </summary>
        internal RNComposeModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNCompose";
            }
        }
    }
}
