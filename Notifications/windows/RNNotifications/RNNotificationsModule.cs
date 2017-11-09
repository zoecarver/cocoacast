using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Com.Reactlibrary.RNNotifications
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNNotificationsModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNNotificationsModule"/>.
        /// </summary>
        internal RNNotificationsModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNNotifications";
            }
        }
    }
}
