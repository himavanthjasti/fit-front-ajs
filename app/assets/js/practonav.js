(function ( $, window, document, undefined ) {
    var pluginName = 'practoNav';
    var cache = {};
    var templates = {
        outer: '<div class="practo_GlobalNavigation">'+
                    '<ul class="context_switcher mainNav">'+
                    '<li><a class="dots"></a>'+
                        '<div class="pageTitle gt600"><%=currentTitle%></div>'+
                        '<% if ( finalContextList && finalContextList.length) { %>'+
                                '<ul class="subNav">'+
                                '<% if ( addPracticeLink ) { %>'+
                                    '<li class="padded"><strong>PRACTICES</strong> '+
                                    '<a href="<%=addPracticeLink.link%>" id="addpracticelink"><%= addPracticeLink.label%></a>'+
                                    '</li>'+
                                '<% } %>'+
                                '<% for ( var i = 0; i < finalContextList.length; i++ ) { %>'+
                                    '<li class="<%=finalContextList[i].type%>">'+
                                    '<% if ( finalContextList[i].link ) { %>'+
                                        '<a href="<%=finalContextList[i].link%>">'+
                                        '<% if ( finalContextList[i].type && (finalContextList[i].type.search("CLINIC") > -1 || finalContextList[i].type.search("ORGANISATION") > -1)) { %>'+
                                            '<i class="selectable"></i>'+
                                            '<div class="foldedName"><%=finalContextList[i].label%></div>'+

                                        '<% } %>'+
                                        '<% if ( finalContextList[i].type && finalContextList[i].type.search("CONTEXT") > -1 ) { %>'+
                                            '<%=finalContextList[i].label%>'+
                                            '<i class="rightpointedarrow"></i>'+
                                        '<% } %>'+
                                        '</a>'+
                                    '<% }else{ %>'+
                                        '<%=finalContextList[i].label%>'+
                                    '<% } %>'+

                                    '</li>'+
                                '<% } %></ul>'+
                        '<% } %>'+
                    '<i class="dropdownarrow_icon nav_icon"></i></li></ul>'+
                    '<i class="separator"></i>'+
                    '<div class="middleNavContainer">'+

                    '</div>'+
                    '<ul class="userDropdown mainNav">'+
                        '<% if ( includeSearch ) { %>'+
                            '<li class="searchContainer"><a class="lt1200">'+
                                '<i class="search_icon nav_icon"></i></a>'+
                                '<ul class="subNav ">'+

                                    '<li class="lt1200"><input class="practo_nav_search_min" placeholder="<%=searchPlaceholder%>" id="pr_mainSearch" type="text" />'+
                                    '<div id="search_results"></div></li>'+
                                    '<li><div id="search_results_max"></div></li>'+

                                '</ul>'+
                                '<input class="gt1200 practo_nav_search_min" placeholder="<%=searchPlaceholder%>" id="pr_mainSearch_max" type="text" />'+

                            '</li>'+
                        '<% } %>'+
                        '<% if ( addList && addList.length ) { %>'+
                            '<li><a title="Add Things">'+
                                '<i class="add_icon nav_icon"></i></a>'+
                                '<ul class="subNav">'+
                                        '<% for ( var i = 0; i < addList.length; i++ ) { %>'+
                                            '<li><a href="<%=addList[i].link%>"><i class="add_icon nav_icon"></i><%=addList[i].label%></a>'+
                                            '</li>'+
                                        '<% } %>'+
                                    '</ul>'+
                            '</li>'+
                        '<% } %>'+

                        '<% if ( notificationsLink ) { %>'+
                            '<li class="gt600"><a href="<%=notificationsLink%>" title="Notifications about your practice">'+
                                '<i class="nav_icon notification_icon"></i></a>'+

                            '</li>'+
                        '<% } %>'+

                        '<li class="gt600 productFeedCell"><a class="" title="Interesting Updates on Practo Services">'+
                            '<i class="nav_icon news_icon"></i><span><%=productFeed.length%></span></a>'+
                                '<ul class="subNav productFeedContainer">'+

                                '</ul>'+
                        '</li>'+

                        '<% if ( includeSupportButton ) { %>'+
                            '<li><a class="" title="Get instant support, from the Practo team">'+
                                '<i class="nav_icon support_icon"></i></a>'+
                            '</li>'+
                        '<% } %>'+

                        '<li><i class="separator"></i><a class="" title="Manage your subscriptions, personal medical records & profile">'+
                            '<i class="userDropdown_link"></i></a>'+
                            '<ul class="subNav">'+
                                '<li class="padded"><img src="<%=avatarPath%>" class="practo_avatar"/>'+
                                '<div class="namecontainer"><%=accountName%><br/><%=accountEmail%>'+
                                '<br/><a id="myaccountLink" href="<%=accountsHost%>">My Account</a>'+
                                '</div><div class="clearboth"></div></li>'+
                                '<% if ( settingsList && settingsList.length ) { %>'+
                                    '<% for ( var i = 0; i < settingsList.length; i++ ) { %>'+
                                        '<li><a href="<%=settingsList[i].link%>">'+
                                            '<% if (settingsList[i].label == "Settings" ) { %>'+
                                                '<i class="settings_double_icon nav_icon"></i>'+
                                            '<% } %>'+
                                            '<%=settingsList[i].label%><i class="rightpointedarrow"></i></a>'+
                                        '</li>'+
                                    '<% } %>'+
                                '<% } %>'+
                                '<li><a href="<%=logoutUrl%>"><i class="logout_icon nav_icon"></i>Logout<i class="rightpointedarrow"></i></a></li>'+
                            '</ul>'+
                        '</li>'+
                    '</ul>'+
                '</div>',
        middleNav : '<ul class="mainNav middleNav gt960"><% for ( var i = 0; i < finalNavList.length; i++ ) { %>'+
                        '<li '+
                            '<% if ( finalNavList[i].attribs ) { %>'+
                                '<% for ( key in finalNavList[i].attribs ) { %>'+
                                    ' <%=key%>="<%=finalNavList[i].attribs[key]%>"'+
                                '<% } %>'+
                            '<% } %>'+
                        '>'+
                            '<% if ( finalNavList[i].subList ) { %>'+
                                '<a><%=finalNavList[i].label%><i class="dropdownarrow_icon nav_icon"></i></a>'+
                                '<ul class="subNav"><% for ( var j = 0; j < finalNavList[i].subList.length; j++ ) { %>'+
                                    '<li><a href="<%=finalNavList[i].subList[j].link%>"><%=finalNavList[i].subList[j].label%></a>'+
                                    '</li>'+
                                '<% } %></ul>'+
                            '<% }else{ %>'+
                                '<a href="<%=finalNavList[i].link%>" '+
                                    '<% if ( finalNavList[i].title ) { %>'+
                                        'title="<%=finalNavList[i].title%>"'+
                                     '<% } %>'+
                                '><%=finalNavList[i].label %></a>'+
                            '<% } %>'+
                            '<% if ( selectedNavLabel &&  selectedNavLabel == finalNavList[i].label ) { %>'+
                                '<div class="selectedarraow_container">'+
                                    '<span class="selectedarraow"></span>'+
                                '</div>'+
                            '<% } %>'+
                        '</li>'+
                    '<% } %></ul>'+
                    '<ul class="mainNav middleNav lt960"><% for ( var i = 0; i < finalNavList.length; i++ ) { %>'+

                        '<% if ( selectedNavLabel &&  selectedNavLabel == finalNavList[i].label ) { %>'+
                            '<li '+
                                '<% if ( finalNavList[i].attribs ) { %>'+
                                    '<% for ( key in finalNavList[i].attribs ) { %>'+
                                        ' <%=key%>="<%=finalNavList[i].attribs[key]%>"'+
                                    '<% } %>'+
                                '<% } %>'+
                            '>'+
                                '<a ><%=finalNavList[i].label%></a>'+
                                '<i class="dropdownarrow_icon nav_icon"></i>'+
                                '<ul class="subNav">'+
                                    '<% for ( var j = 0; j < finalNavList.length; j++ ) { %>'+

                                        '<li '+
                                            '<% if ( finalNavList[i].attribs ) { %>'+
                                                '<% for ( key in finalNavList[i].attribs ) { %>'+
                                                    ' <%=key%>="<%=finalNavList[i].attribs[key]%>"'+
                                                '<% } %>'+
                                            '<% } %>'+
                                        '>'+
                                            '<a href="<%=finalNavList[j].link%>"><%=finalNavList[j].label%></a>'+
                                        '</li>'+
                                    '<% } %>'+
                                '</ul>'+

                            '</li>'+
                        '<% } %>'+
                    '<% } %></ul>',
        productFeed:'<% for ( var i = 0; i < productFeed.length; i++ ) { %>'+
                        '<li><a href="<%=productFeed[i].link%>"><%=productFeed[i].title%></a>'+
                        '</li>'+
                    '<% } %>'+
                    '<% if ( moreFeedLink) { %>'+
                    '<li style="text-align:center"><a href="<%=moreFeedLink%>"> View All News </a></li>'+
                    '<% } %>'
    }
    var defaults = {
            isLoggedIn : false,
            accountId : null,
            accountName : "",
            accountEmail : "",
            userRole : "",
            currentApp : "RAY",
            rayHost:"http://ray.practo.com",
            rayWebsiteHost:"http://practo.com/ray",
            fabricHost:"http://www.practo.com",
            pvrHost:"http://practo.com/pvr",
            epicHost:"http://epicenter.practo.com",
            accountsHost:"http://accounts.practo.com",
            logoutUrl:"/logout",
            currentTitle:"",
            logoLink:"/",
            signupLink:"/signup",
            loginLink:"/login",
            titleList:[],
            navList:[],
            includeSearch:false,
            includeCitySelector:false,
            includeAddButton:false,
            includeSupportButton:false,
            cityChangeCallback:null,
            hideSignupLink:false,
            onRender:null,
            cityList:[],
            addList:[],
            settingsList:[],
			baseDomainForNav:"http://nav.practodev.in/development",
            searchPlaceholder:"Search",
            searchId:"pr_mainSearch",
            selectedNavLabel:null,
            includeAndroid:false,
            includeProductButton:true,
            productFeed:[],
            notificationsLink:null,
            addPracticeLink:null,
            moreFeedLink:null
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.navOptions = {};
        this._init();
    }

    Plugin.prototype = {

        _init: function() {
            var self = this;
            var lastResizeTimeStamp =null;

            var options = this.options;

            options.avatarPath = options.accountsHost+"/profile_picture/" + options.accountId + "/medium_thumbnail";

            var avatarImage = $("<img>").attr("src",options.accountsHost+"/profile_picture/" + options.accountId + "/medium_thumbnail")
                    .error(function(){
                        $(".practo_GlobalNavigation .practo_avatar").attr("src",options.accountsHost+"/static/images/profile.png");
                        options.avatarPath = options.accountsHost+"/static/images/profile.png";
                    })

            self._render();

            window.setTimeout(function(){
                if(typeof options.onRender == "function"){

                    options.onRender();
                }
            },100);

        },
        _render:function(){

            var self = this;
            var options = self.options;

            $(".practo_GlobalNavigation").remove();
            $(".pr_footer").remove();

            options.finalNavList = self._applyACL();
            self._insertDefaultContexts();
            self._fixSelectedLabel();

            $("body").prepend(self._tmpl(templates.outer,options));
            $(".practo_GlobalNavigation .middleNavContainer").append(self._tmpl(templates.middleNav,options));
            $(".practo_GlobalNavigation .productFeedContainer").html(self._tmpl(templates.productFeed,options));

            self._attachBackgrounds();
            self._makeDropdownsWork();

            self._hideThingsNotneeded();

            $( '.mainNav > li:has(ul)' ).doubleTapToGo();

        },
        _hideThingsNotneeded:function(){
            var self = this;
            var options = self.options;

            if(!((options.productFeed && options.productFeed.length) || options.moreFeedLink) ){
                $(".practo_GlobalNavigation .productFeedCell").hide();
            }
            else{
                $(".practo_GlobalNavigation .productFeedCell").show();
            }
        },
        _makeDropdownsWork:function(){
            $(".practo_GlobalNavigation .mainNav > li:not(.pr_nav_dropdown)").click(function(e){
                e.stopPropagation();
                if(e.which == 1){
                    var toBeClosed = false;
                    if($(this).hasClass("opened")){
                        if (!$(this).hasClass("searchContainer")) toBeClosed = true;
                    }
                    $(".practo_GlobalNavigation .opened").removeClass("opened");
                    if(!toBeClosed){
                        $(this).addClass("opened");
                    }
                    if($(e.target).attr("href")){
                        window.location = $(e.target).attr("href");
                        $(".practo_GlobalNavigation .opened").removeClass("opened");
                    }
                }
            });

            $(".practo_GlobalNavigation .mainNav > li:not(.pr_nav_dropdown)").on("touchend",function(e){
                e.stopPropagation();

                var target = e.target;
                if (target && $(target).parents('.context_switcher').length) {
                    return;
                }

                $(".practo_GlobalNavigation .opened").removeClass("opened");
                $(this).addClass("opened");

                if($(e.target).attr("href")){
                    window.location = $(e.target).attr("href");
                }
                $(".practo_GlobalNavigation .opened:not(.searchContainer)").removeClass("opened");
            });

            $(".practo_GlobalNavigation .mainNav > li").addClass("pr_nav_dropdown");

            $(document).click(function(e){
                if($(e.target).attr("href")){
                    //window.location = $(e.target).attr("href");
                }
                $(".practo_GlobalNavigation .opened").removeClass("opened");
            })
            $(document).on("touchend",function(e){
                if($(e.target).attr("href")){
                    //window.location = e.target.attr("href");
                }
                $(".practo_GlobalNavigation .opened").removeClass("opened");
            })

        },
        _applyACL:function(){
            var self = this;

            var finalNavList = [];

            if(self.options.userRole){
                $.each(self.options.navList,function(index,eachItem){
                    if(eachItem.roles){
                        var allowedRoles = this.roles.split(",");

                        if(allowedRoles.length>0){
                            if($.inArray(self.options.userRole,allowedRoles) != -1){
                                finalNavList.push(eachItem);
                            }
                        }
                    }
                    else{
                        finalNavList.push(eachItem);
                    }

                })
            }
            else{
                finalNavList = self.options.navList;
            }

            return finalNavList;

        },
        _insertDefaultContexts:function(){
            var self = this;
            var finalContextList = [];

            if(this.options.titleList.length){

                $.each(this.options.titleList,function(index,item){
                    finalContextList.push(item);
                })


            }

            if(this.options.currentApp != "RAY" && this.options.currentApp != "FABRIC"){
                finalContextList.push({
                    "label":"Practices",
                    "link":this.options.rayHost,
                    "type":"CONTEXT"
                })
            }

            if(this.options.accountEmail){
                if(this.options.accountEmail.search("@practo.com") != -1){
                    if(this.options.currentApp != "EPICENTER"){
                            finalContextList.push({
                                "label":"Epicenter",
                                "link":this.options.epicHost,
                                "type":"CONTEXT"
                             })
                    }

                }
            }

            finalContextList.push({
                "label":"Find a Doctor",
                "link":this.options.fabricHost+"?redirect=false",
                "type":"CONTEXT"
            })

            if(this.options.contextList){
                $.each(this.options.contextList,function(index,eachContext){
                    if(eachContext.label && eachContext.link){
                        finalContextList.push({
                            "label":eachContext.label,
                            "link":eachContext.link,
                            "type":"CONTEXT"
                        })
                    }

                })
            }
            this.options.finalContextList = [];

            this.options.finalContextList = finalContextList;


        },
        _tmpl : function(str, data){

            var fn = !/\W/.test(str) ?
              cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

              // Generate a reusable function that will serve as a template
              // generator (and which will be cached).
                  new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +
                    // Convert the template into pure JavaScript
                    str.replace(/[\r\t\n]/g, " ")
                       .split("<%").join("\t")
                       .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                       .replace(/\t=(.*?)%>/g, "',$1,'")
                       .split("\t").join("');")
                       .split("%>").join("p.push('")
                       .split("\r").join("\\'")
                    + "');}return p.join('');");

            // Provide some basic currying to the user
            return data ? fn( data ) : fn;
        },
        _attachBackgrounds:function(){
            var self = this;

            $(".practo_GlobalNavigation .dots,.practo_GlobalNavigation .selectable,.practo_GlobalNavigation .rightpointedarrow").css("background-image",self._getBackgroundImagePath("sprites.png"));
            $(".practo_GlobalNavigation .userDropdown_link,.practo_GlobalNavigation .support_icon").css("background-image",self._getBackgroundImagePath("sprites.png"));
            $(".practo_GlobalNavigation .nav_icon").css("background-image",self._getBackgroundImagePath("sprites.png"));
            $(".practo_GlobalNavigation .selectedarraow").css("background-image",self._getBackgroundImagePath("sprites.png"));
            $(".practo_GlobalNavigation .separator").css("background-image",self._getBackgroundImagePath("nav-seprator.png"));

        },
        _getBackgroundImagePath : function(fileName){
            var options = this.options;

            return "url('"+ options.baseDomainForNav+"/images/" + fileName + "')";
        },
        getImagePath : function(fileName){
            var options = this.options;

            return options.baseDomainForNav+"/images/" + fileName;
        },
        getLogoPath: function(el, options) {
            var logoPath = "/images/ray";

            if(options.currentApp == "RAY"){
                logoPath = "/images/ray";
            }
            else if(options.currentApp == "FABRIC"){
                logoPath = "/images/fabric";
            }
            else if(options.currentApp == "PVR"){
                logoPath = "/images/pvr";
            }
            else if(options.currentApp == "EPICENTER"){
                logoPath = "/images/epicenter";
            }
            else if(options.currentApp == "ACCOUNTS"){
                logoPath = "/images/accounts";
            }
            else if(options.currentApp == "PRACTO"){
                logoPath = "/images/practo";
            }
            else if(options.currentApp == "BLOG"){
                logoPath = "/images/blog";
            }

            if(!options.isLoggedIn){
                logoPath = logoPath + "_big";
            }

            return options.baseDomainForNav+logoPath+".png";

        },
        _getFooter:function(el,options){


		},
        _fixSelectedLabel:function(){
            var self = this;
            var found = false;
            if(self.options.finalNavList.length){
                if(!self.options.selectedNavLabel){
                    self.options.selectedNavLabel = self.options.finalNavList[0].label;
                }

                $.each(self.options.finalNavList,function(index,navItem){
                    if(self.options.selectedNavLabel == navItem.label){
                        found = true;
                        return false;
                    }
                })

                if(!found){
                    self.options.selectedNavLabel = self.options.finalNavList[0].label;
                }
            }

        },
		setSelectedLabel:function(selectedLabel){
            var self = this;
            self.options.selectedNavLabel = selectedLabel;

            self._fixSelectedLabel();
            $(".practo_GlobalNavigation .middleNavContainer").html(self._tmpl(templates.middleNav,self.options));
            self._attachBackgrounds();
            self._makeDropdownsWork();


        },
        setCurrentTitle:function(currentTitle){
           var self = this;
           self.options.currentTitle = currentTitle;
           self._render();

        },
        setCurrentTitleType:function(currentTitleType){
           var self = this;
           self.options.titleList = titleList;

           self._render();

        },
        setTitleList:function(titleList){
           var self = this;
           self.options.titleList = titleList;

           self._render();

        },
        setNavList:function(navList){
           var self = this;
           self.options.navList = navList;
           self._fixSelectedLabel();

           $(".practo_GlobalNavigation .middleNavContainer").html(self._tmpl(templates.middleNav,self.options));
           self._attachBackgrounds();
           self._makeDropdownsWork();

        },
        setProductFeed:function(feed){
            var self = this;
            self.options.productFeed = feed;

            $(".practo_GlobalNavigation .productFeedContainer").html(self._tmpl(templates.productFeed,self.options));

            if(self.options.productFeed.length){
                $(".practo_GlobalNavigation .productFeedCell span").html(self.options.productFeed.length);
            }
            else{
                $(".practo_GlobalNavigation .productFeedCell span").hide();
            }


            self._hideThingsNotneeded();
            self._makeDropdownsWork();

        }
    };


    $.fn[pluginName] = function ( options ) {
        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            return this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
            });
        }
    }
})( jQuery, window, document );

//doubleTapToGo

(function($, window, document, undefined) {
    $.fn.doubleTapToGo = function(params) {
        if (!('ontouchstart' in window) && !navigator.msMaxTouchPoints && !navigator.userAgent.toLowerCase()
            .match(/windows phone os 7/i)) return false;

        this.each(function() {
            var curItem = false;

            $(this)
                .on('click', function(e) {
                var item = $(this);
                if (item[0] != curItem[0]) {
                    e.preventDefault();
                    curItem = item;
                }
            });

            $(document)
                .on('click touchstart MSPointerDown', function(e) {
                var resetItem = true,
                    parents = $(e.target)
                        .parents();

                for (var i = 0; i < parents.length; i++)
                if (parents[i] == curItem[0]) resetItem = false;

                if (resetItem) curItem = false;
            });
        });
        return this;
    };
})(jQuery, window, document);
