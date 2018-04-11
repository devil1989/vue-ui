module.exports = {
    'getInterface': function(url) {
        var host = location.host;
        var returnUrl = '';
        //return host
    
        // if (host.indexOf('local') !== -1) {
        //     if (host.indexOf('cctalk')) {
        //         returnUrl = 'cctalk-local-frontend-ocean.intra.yeshj.com';
        //     } else {
        //         returnUrl = 'hjclass-local-frontend-ocean.intra.yeshj.com';
        //     }
            
        // } else if (host.indexOf('qa') !== -1) {
        //     returnUrl = 'local...';
        // } else if (host.indexOf('yz') !== -1) {
        //     returnUrl = 'local...';
        // } else {
        //     returnUrl = 'local...';
        // }

        return '//'+host+url;
    },
    interfaceDeal: function (res, isSpecial) {
        var bool = true;
        switch (res.status) {
            case -40000:
                alert('参数错误');
                bool = false;
                break;
            case -50000:
                alert('服务器发生错误，请稍后再试');
                bool = false;
                break;
        }

        if ( bool && !isSpecial && res.status < 0 ) {
            alert('服务器发生了错误');
            bool = false;
        }
        return bool;
    }
};