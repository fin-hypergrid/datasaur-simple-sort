/* eslint-env commonjs */

'use strict';

var DatasaurBase = require('datasaur-base');

var DatasaurSimpleSort = DatasaurBase.extend('DatasaurSimpleSort', {

    sort: function(x, options) {
        var source = this.next.next;
        var index = Array(source.getRowCount());
        for (var i = index.length; i--; ) index[i] = i;

        var comparator = options && options.comparator ? options.comparator.bind(source, x) : function(y1, y2) {
            var v1 = source.getValue(x, y1), v2 = source.getValue(x, y2);
            return v1 < v2 ? -1 : v1 > v2 ? 1 : 0 ;
        };

        index.sort(comparator);

        if ((options && options.dir || '').toLowerCase() === 'desc') {
            index.reverse();
        }

        return this.setIndex(index);
    }

});

DatasaurSimpleSort.version = '3.0.1';

module.exports = DatasaurSimpleSort;
