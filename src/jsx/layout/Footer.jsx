import React, { } from 'react';
import { Link } from 'react-router-dom';

import '../../css/footer.scss';

export default function Footer() {
    return (
        <div id='footer-container'>
            <div className="copyright">
                <p>© Copyright 2019 <Link to={'#'}>Swap</Link> I All Rights Reserved</p>
            </div>
            <div className="footer-social">
                <ul>
                    <li><Link to={'#'}><i className="fa fa-facebook"></i></Link></li>
                    <li><Link to={'#'}><i className="fa fa-twitter"></i></Link></li>
                    <li><Link to={'#'}><i className="fa fa-linkedin"></i></Link></li>
                    <li><Link to={'#'}><i className="fa fa-youtube"></i></Link></li>
                </ul>
            </div>
        </div>
    );
}
