/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import expect from 'expect';

import API, { constructXMLBody } from '../CSW';

describe('Test correctness of the CSW APIs', () => {
    it('getRecords ISO Metadata Profile', (done) => {
        API.getRecords('base/web/client/test-resources/csw/getRecordsResponseISO.xml', 1, 1).then((result) => {
            try {
                expect(result).toExist();
                expect(result.records).toExist();
                expect(result.records.length).toBe(1);
                done();
            } catch (ex) {
                done(ex);
            }
        });
    });
    it('getRecords Error', (done) => {
        API.getRecords('base/web/client/test-resources/csw/getRecordsResponseException.xml', 1, 1).then((result) => {
            try {
                expect(result).toExist();
                expect(result.error).toExist();
                done();
            } catch (ex) {
                done(ex);
            }
        });
    });
    it('getRecords Dublin Core', (done) => {
        API.getRecords('base/web/client/test-resources/csw/getRecordsResponseDC.xml', 1, 2).then((result) => {
            try {
                expect(result).toExist();
                expect(result.records).toExist();
                expect(result.records.length).toBe(4);
                const [rec0, rec1, rec2, rec3] = result.records;

                expect(rec0.dc).toExist();
                expect(rec0.dc.URI).toExist();
                expect(rec0.dc.URI[0]);
                expect(rec0.boundingBox).toExist();
                expect(rec0.boundingBox.crs).toBe('EPSG:4326');
                expect(rec0.boundingBox.extent).toEqual([45.542, 11.874, 46.026, 12.718]);
                const uri = rec0.dc.URI[0];
                expect(uri.name).toExist();
                expect(uri.value).toExist();
                expect(uri.description).toExist();

                expect(rec1.boundingBox).toExist();
                expect(rec1.boundingBox.crs).toBe('EPSG:4326');
                expect(rec1.boundingBox.extent).toEqual([12.002717999999996, 45.760718, 12.429282000000002, 46.187282]);

                expect(rec2.boundingBox).toExist();
                expect(rec2.boundingBox.crs).toBe('EPSG:4326');
                expect(rec2.boundingBox.extent).toEqual([ -4.14168, 47.93257, -4.1149, 47.959353362144 ]);

                expect(rec3.boundingBox).toExist();
                expect(rec3.boundingBox.crs).toBe('EPSG:4326');
                expect(rec3.boundingBox.extent).toEqual([ 12.56, 47.46, 13.27, 48.13 ]);
                done();
            } catch (ex) {
                done(ex);
            }
        });
    });
    it('getRecordsById ISO Metadata Profile', (done) => {
        API.getRecordById('base/web/client/test-resources/csw/getRecordById.xml').then((result) => {
            try {
                expect(result).toExist();
                expect(result.dc).toExist();
                expect(result.dc.identifier).toBe("msg_rss_micro");
                done();
            } catch (ex) {
                done(ex);
            }
        });
    });
    it('getRecordsById Error', (done) => {
        API.getRecordById('base/web/client/test-resources/csw/getRecordsResponseException.xml').then((result) => {
            try {
                expect(result).toExist();
                expect(result.error).toExist();
                done();
            } catch (ex) {
                done(ex);
            }
        });
    });
});

describe("constructXMLBody", () => {
    it("construct body without PropertyIsLike when there is no search text", () => {
        const body = constructXMLBody(1, 5, null);
        expect(body.indexOf("PropertyIsLike")).toBe(-1);
    });

    it("construct body with PropertyIsLike when there is search text", () => {
        const body = constructXMLBody(1, 5, "text");
        expect(body.indexOf("PropertyIsLike")).toNotBe(-1);
    });

    it("construct body with PropertyIsEqualTo always", () => {
        const body = constructXMLBody(1, 5, "text");
        expect(body.indexOf("PropertyIsEqualTo")).toNotBe(-1);

        const body2 = constructXMLBody(1, 5, null);
        expect(body2.indexOf("PropertyIsEqualTo")).toNotBe(-1);
    });
});
