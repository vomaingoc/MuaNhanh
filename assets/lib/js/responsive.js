function getdevice() {
    var htmlWidth = document.getElementsByTagName("html")[0].offsetWidth;
    var md = new MobileDetect(window.navigator.userAgent);
    var myhtml = document.getElementsByTagName("html");
    //Desktop
    if (md.mobile() === null && htmlWidth > 1025) {
        myhtml[0].classList.add("isDesktop");
        myhtml[0].classList.remove("isMobile");
        myhtml[0].classList.remove("isTablet");
        myhtml[0].classList.remove("isPhone");
    }
    //Mobile
    else {
        myhtml[0].classList.remove("isDesktop");
        myhtml[0].classList.add("isMobile");
        if (md.phone()){
            myhtml[0].classList.add("isPhone");
            myhtml[0].classList.remove("isTablet");
        }
        else{
            myhtml[0].classList.add("isTablet");
            myhtml[0].classList.remove("isPhone");
        }
    }
    //Browser is Safari
    md.userAgent() === "Safari" ? myhtml[0].classList.add("isSafari") : myhtml[0].classList.remove("isSafari");
    //OS is iOS
    md.os() === "iOS" ? myhtml[0].classList.add("isiOS") : myhtml[0].classList.remove("isiOS");
    /**
    outcome.push({key: 'phone()', val: md.phone()});
    outcome.push({key: 'tablet()', val: md.tablet()});
    outcome.push({key: 'mobile()', val: md.mobile()});
    outcome.push({key: 'os()', val: md.os()});
    outcome.push({key: 'userAgent()', val: md.userAgent()});
    outcome.push({key: 'mobileGrade()', val: md.mobileGrade()});
    outcome.push({key: 'smaller side', val: MobileDetect._impl.getDeviceSmallerSide()});
    outcome.push({key: '_version', val: MobileDetect.version || '(<1.3.3)'});
    **/
}
document.addEventListener("DOMContentLoaded", getdevice);
window.addEventListener("resize", getdevice);
