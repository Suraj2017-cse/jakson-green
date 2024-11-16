// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DocumentCode2, OceanProtocol, Level, ShieldCross, InfoCircle, I24Support, Driving } from 'iconsax-react';

// icons
const icons = {
  samplePage: DocumentCode2,
  menuLevel: OceanProtocol,
  menuLevelSubtitle: Level,
  disabledMenu: ShieldCross,
  chipMenu: InfoCircle,
  documentation: I24Support,
  roadmap: Driving
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const support = {
  id: 'other',
  title: <FormattedMessage id="others" />,
  type: 'group',
  children: [
    {
      id: 'jaksonGreen',
      title: <FormattedMessage id="Jakson Green" />,
      type: 'item',
      url: '/ayana/main',
      icon: icons.samplePage
    },
    // {
    //   id: 'ayana',
    //   title: <FormattedMessage id="ayana" />,
    //   type: 'item',
    //   url: '/ayana/main',
    //   icon: icons.documentation,
    //   external: true,
    //   target: true,
    //   chip: {
    //     label: 'gitbook',
    //     color: 'info',
    //     size: 'small'
    //   }
    // },
    // {
    //   id: 'Analytics',
    //   title: <FormattedMessage id="Analytics" />,
    //   type: 'item',
    //   url: '/analytics/details',
    //   icon: icons.roadmap,
    //   external: true,
    //   target: true
    // }
  ]
};

export default support;
