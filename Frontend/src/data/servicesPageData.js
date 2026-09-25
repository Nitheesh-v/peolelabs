import { Settings, ClipboardList, RefreshCw, CloudUpload, Server, GraduationCap } from 'lucide-react';

export const servicesList = [
  {
    id: "managed-app-services",
    name: "Managed Application Services",
    icon: Settings,
    shortDesc: "Comprehensive technical and functional PeopleSoft support designed around your organization's operational needs.",
    bannerDesc: "PeopleLabs Consulting provides a comprehensive range of managed application services to help organizations operate their PeopleSoft environments effectively. Our team supports both technical and functional requirements through an SLA-based service model tailored to each organization's support and enhancement needs.",
    cards: [
      {
        title: "Technical Support",
        description: "Technical support for the ongoing operation and maintenance of PeopleSoft environments."
      },
      {
        title: "Functional Support",
        description: "Functional assistance designed to support business processes and PeopleSoft application requirements."
      },
      {
        title: "SLA-Based Services",
        description: "Structured support delivered through an SLA-based service model aligned with organizational requirements."
      },
      {
        title: "Application Enhancement",
        description: "Support for ongoing PeopleSoft application enhancements as business needs evolve."
      }
    ]
  },
  {
    id: "project-management",
    name: "Project Management",
    icon: ClipboardList,
    shortDesc: "End-to-end IT project coordination ensuring PeopleSoft projects meet timelines, budgets, and business objectives.",
    bannerDesc: "Our IT project management services support PeopleSoft initiatives from planning through delivery. PeopleLabs coordinates project activities, timelines, budgets, and communication to keep stakeholders informed throughout the engagement.",
    cards: [
      {
        title: "Project Planning",
        description: "Structured planning to define project activities, requirements, timelines, and delivery objectives."
      },
      {
        title: "Delivery Coordination",
        description: "Coordination of PeopleSoft project activities from initiation through completion."
      },
      {
        title: "Timeline & Budget Management",
        description: "Management of project timelines and budgets throughout the delivery lifecycle."
      },
      {
        title: "Stakeholder Communication",
        description: "Clear project communication to keep relevant stakeholders informed throughout the engagement."
      }
    ]
  },
  {
    id: "peoplesoft-upgrade",
    name: "PeopleSoft Upgrade Service",
    icon: RefreshCw,
    shortDesc: "Upgrading PeopleSoft systems to newer releases to leverage advanced features and operational enhancements.",
    bannerDesc: "Our PeopleSoft team helps organizations upgrade their environments to newer versions, enabling access to updated functionality and features that support evolving business requirements.",
    cards: [
      {
        title: "Upgrade Assessment",
        description: "Review of the existing PeopleSoft environment and upgrade requirements."
      },
      {
        title: "Upgrade Planning",
        description: "Structured planning for the transition to a newer PeopleSoft version."
      },
      {
        title: "Upgrade Implementation",
        description: "Technical and functional support throughout the PeopleSoft upgrade process."
      },
      {
        title: "Post-Upgrade Support",
        description: "Support following the upgrade to help address application and operational requirements."
      }
    ]
  },
  {
    id: "cloud-migration",
    name: "Cloud Migration",
    icon: CloudUpload,
    shortDesc: "Smooth transition of PeopleSoft application workloads and infrastructure to secure cloud environments.",
    bannerDesc: "Our cloud migration services help organizations transition their application environments to the cloud through assessment, migration planning, implementation, and transition support.",
    cards: [
      {
        title: "Environment Assessment",
        description: "Assessment of current systems and requirements before migration."
      },
      {
        title: "Migration Planning",
        description: "Development of a structured cloud migration approach based on the existing environment."
      },
      {
        title: "Migration Implementation",
        description: "Support for executing the planned transition to the cloud environment."
      },
      {
        title: "Transition Support",
        description: "Assistance throughout the transition to support continuity and adoption."
      }
    ]
  },
  {
    id: "virtualization-services",
    name: "Virtualization Services",
    icon: Server,
    shortDesc: "Virtual infrastructure design, deployment, and administration for efficient IT hardware utilization.",
    bannerDesc: "Our virtualization services support the design, implementation, and management of virtual infrastructure to help organizations build efficient and scalable IT environments.",
    cards: [
      {
        title: "Infrastructure Design",
        description: "Virtual infrastructure design aligned with organizational technology requirements."
      },
      {
        title: "Implementation",
        description: "Support for implementing virtualized infrastructure environments."
      },
      {
        title: "Environment Management",
        description: "Ongoing support for managing virtual infrastructure."
      },
      {
        title: "Infrastructure Efficiency",
        description: "Virtualization approaches designed to make effective use of existing IT investments."
      }
    ]
  },
  {
    id: "training-and-support",
    name: "Training and Support",
    icon: GraduationCap,
    shortDesc: "User bootcamps, functional coaching, and ongoing support to maximize PeopleSoft adoption across teams.",
    bannerDesc: "PeopleLabs provides PeopleSoft training and support to help employees develop practical knowledge of PeopleSoft technology. Training options include group sessions, one-on-one coaching, and ongoing application support.",
    cards: [
      {
        title: "Group Training",
        description: "PeopleSoft training sessions designed for groups and teams."
      },
      {
        title: "One-on-One Coaching",
        description: "Individual coaching focused on specific PeopleSoft learning requirements."
      },
      {
        title: "Application Support",
        description: "Ongoing support for employees using PeopleSoft applications."
      },
      {
        title: "Knowledge Development",
        description: "Practical guidance designed to strengthen users' understanding of PeopleSoft functionality."
      }
    ]
  }
];
