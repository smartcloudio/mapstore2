/*
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import PropTypes from 'prop-types';
import { Col, Row, Form, FormGroup, FormControl } from 'react-bootstrap';
import I18N from '../../../components/I18N/I18N';
import googleGroups from '../../assets/img/groups_logo.png';
import LinkedinGroup from '../../assets/img/linkedin_group.png';
import { Follow } from 'react-twitter-widgets';
import Button from '../../../components/misc/Button';

class MailingLists extends React.Component {
    static contextTypes = {
        messages: PropTypes.object
    };

    render() {
        return null;
    }
}

export default MailingLists;
