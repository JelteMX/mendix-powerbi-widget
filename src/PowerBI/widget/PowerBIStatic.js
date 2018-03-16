import {
    defineWidget,
    log,
    runCallback,
} from 'widget-base-helpers';

import * as pbi from 'powerbi-client';

import template from './PowerBIStatic.template.html';

export default defineWidget('PowerBIStatic', template, {

    reportID: null,
    embedURL: null,
    embedToken: null,

    widgetNode: null,

    _obj: null,
    _powerbi: null,

    constructor() {
        this.log = log.bind(this);
        this.runCallback = runCallback.bind(this);
    },

    postCreate() {
        this.log('postCreate', this._WIDGET_VERSION);
        this._powerbi = window.powerbi || null;

        if (null === this._powerbi) {
            console.warn(this.id + '.postCreate :: cannot find PowerBI client');
            return;
        }

        const embedConfig = {
            type: 'report',
            id: this.reportID,
            embedUrl: this.embedURL,
            tokenType: pbi.models.TokenType.Aad,
            accessToken: this.embedToken,
        };

        this._powerbi.embed(this.widgetNode, embedConfig);
    },
});
