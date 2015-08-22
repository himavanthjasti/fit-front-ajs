var navConfig = {
  rayLoggedIn : {
            isLoggedIn : true,
            accountId : 1,
            accountName : "Siddhartha Nihalani",
            accountEmail : "sid@practo.com",
            isDoctor : true,
            currentApp : "RAY",
            rayHost:"http://ray.practo.local",
            fabricHost:"http://fabric.practo.local",
            pvrHost:"http://pvr.practo.local",
            epicHost:"http://epicenter.practo.local",
            currentTitle:"My Super Awesome Medical Clinic & Research Center",
            includeSearch:true,
            titleList:[{
                        label:"Clinic 1",
                        link:"#"
                    },
                    {
                        label:"Clinic 2",
                        link:"#"
                    },
                    {
                        label:"Clinic 3",
                        link:"#"
                    }
            ],
            navList : [
              {
                "label":"Dashboard",
                "link":"/dashboard"
              },
              {
                "label":"Calendar",
                "link":"/calendar"
              },
              {
                "label":"Records",
                "link":"/myrecords"
              },
              {
                "label":"Accounting",
                "link":"/clinicaccounting"
              },
              {
                "label":"Analytics",
                "link":"/analytics"
              },
              {
                "label":"Communications",
                "link":"/deliveryreports"
              }
            ]
          },

  rayNotLoggedIn : {
            isLoggedIn : false,
            currentApp : "RAY",
            rayHost:"http://ray.practo.local",
            fabricHost:"http://fabric.practo.local",
            pvrHost:"http://pvr.practo.local",
            epicHost:"http://epicenter.practo.local",
            navList : [
              {
                "label":"Features",
                "link":"/ray/tour"
              },
              {
                "label":"Pricing",
                "link":"/ray/pricing-plans"
              },
              {
                "label":"Contact",
                "link":"/ray/contact"
              }
              
            ]
          },
  fabricNotLoggedIn:{
       isLoggedIn : false,
        currentApp : "FABRIC",
        rayHost:"http://ray.practo.local",
        fabricHost:"http://fabric.practo.local",
        pvrHost:"http://pvr.practo.local",
        epicHost:"http://epicenter.practo.local",
        navList : [
          
          
        ]
  },
  fabricLoggedIn:{
        isLoggedIn : true,
        accountId : 1,
        accountName : "Siddhartha Nihalani",
        accountEmail : "sid@practo.com",
        isDoctor : true,
        currentApp : "FABRIC",
        rayHost:"http://ray.practo.local",
        fabricHost:"http://fabric.practo.local",
        pvrHost:"http://pvr.practo.local",
        epicHost:"http://epicenter.practo.local",
        navList : [
            {
                "label":"Appointment Requests",
                "link":"/ray/tour"
              },
              {
                "label":"Doctor Profile",
                "link":"/ray/pricing-plans"
              },
              {
                "label":"Customize Clinic Page",
                "link":"/ray/contact"
              },
              {
                "label":"Preview Search Listing",
                "link":"/ray/contact"
              },
               {
                "label":"Preview Clinic Website",
                "link":"/ray/contact"
              }
        
          
          
        ]
  },
  pvrNotLoggedIn :  {
        isLoggedIn : false,
        currentApp : "PVR",
        rayHost:"http://ray.practo.local",
        fabricHost:"http://fabric.practo.local",
        pvrHost:"http://pvr.practo.local",
        epicHost:"http://epicenter.practo.local",
        navList : [
           {
                "label":"Features",
                "link":"/ray/tour"
              },
              {
                "label":"Pricing",
                "link":"/ray/pricing-plans"
              },
              {
                "label":"Contact",
                "link":"/ray/contact"
              }
          
        ]
      },
  pvrLoggedIn:{
      isLoggedIn : true,
        accountId : 1,
        accountName : "Siddhartha Nihalani",
        accountEmail : "sid@practo.com",
        isDoctor : true,
        currentApp : "PVR",
        rayHost:"http://ray.practo.local",
        fabricHost:"http://fabric.practo.local",
        pvrHost:"http://pvr.practo.local",
        epicHost:"http://epicenter.practo.local",
        includeSearch:true,
        navList : [
            {
                "label":"Home",
                "link":"/ray/tour"
              },
              {
                "label":"Call Flow",
                "link":"/ray/pricing-plans"
              },
              {
                "label":"Call Log",
                "link":"/ray/contact"
              },
              {
                "label":"Patients",
                "link":"/ray/contact"
              }
          
        ]
  },
  epicLoggedIn :{
            isLoggedIn : true,
            accountId : 1,
            accountName : "Siddhartha Nihalani",
            accountEmail : "sid@practo.com",
            currentApp : "EPICENTER",
            rayHost:"http://ray.practo.local",
            fabricHost:"http://fabric.practo.local",
            pvrHost:"http://pvr.practo.local",
            epicHost:"http://epicenter.practo.local",
            currentTitle:"Sales Team, West India",
            includeSearch:true,
            navList : [
              {
                "label":"Dashboard",
                "link":"/ray/tour"
              },
              {
                "label":"Practo Ray",
                "link":"#",
                "subList":[
                  {
                    "label":"Trial",
                    "link":"#"
                  },
                  {
                    "label":"Customers",
                    "link":"#"
                  },
                  {
                    "label":"Free",
                    "link":"#"
                  },
                  {
                    "label":"Demo",
                    "link":"#"
                  }
                ]
              },
              {
                "label":"Practo VR",
                "link":"#",
                "subList":[
                  {
                    "label":"Trial",
                    "link":"#"
                  },
                  {
                    "label":"Purchased",
                    "link":"#"
                  },
                  {
                    "label":"Custom",
                    "link":"#"
                  },
                  {
                    "label":"Numbers",
                    "link":"#"
                  }
                ]
              },
              {
                "label":"Practo.com",
                "link":"#",
                "subList":[
                  {
                    "label":"Doctors",
                    "link":"#"
                  },
                  {
                    "label":"Patients",
                    "link":"#"
                  },
                  {
                    "label":"Unverified",
                    "link":"#"
                  },
                  {
                    "label":"Leads",
                    "link":"#"
                  },
                  {
                    "label":"Curation",
                    "link":"#"
                  }
                ]
              },
              {
                "label":"Support",
                "link":"#"
                
              },
              {
                "label":"Metrics",
                "link":"#",
                "subList":[
                  {
                    "label":"Ray Metrics",
                    "link":"#"
                  },
                  {
                    "label":"PVR Metrics",
                    "link":"#"
                  }
                ]
              },
              {
                "label":"Reviews",
                "link":"#"
              }
              
            ]
          
  },
  epicNotLoggedIn : {
     isLoggedIn : false,
      currentApp : "EPICENTER",
      rayHost:"http://ray.practo.local",
      fabricHost:"http://fabric.practo.local",
      pvrHost:"http://pvr.practo.local",
      epicHost:"http://epicenter.practo.local",
      navList : [
        
      ]
  },
  accountsNotLoggedIn : {
      isLoggedIn : false,
      currentApp : "ACCOUNTS",
      rayHost:"http://ray.practo.local",
      fabricHost:"http://fabric.practo.local",
      pvrHost:"http://pvr.practo.local",
      epicHost:"http://epicenter.practo.local",
      navList : [
        
      ]
  },
  accountsLoggedIn : {
      isLoggedIn : true,
      accountId : 1,
      accountName : "Siddhartha Nihalani",
      accountEmail : "sid@practo.com",
      currentApp : "ACCOUNTS",
      rayHost:"http://ray.practo.local",
      fabricHost:"http://fabric.practo.local",
      pvrHost:"http://pvr.practo.local",
      epicHost:"http://epicenter.practo.local",
      navList : [
        {
                "label":"Services",
                "link":"#"
              },
              {
                "label":"Edit Profile",
                "link":"#"
              },
              {
                "label":"Change Password",
                "link":"#"
              }
              
      ]
  },

};