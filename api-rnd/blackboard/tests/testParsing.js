const { parseBlackboardAnnouncements } = require('../announcements/parseBlackboardAnnouncements')

let ann = `

<div class="container  clearfix" id="containerdiv">
    <h2 class="hideoff" id="anonymous_element_4">Content</h2>
    <form name="announcementForm" id="announcementForm" method="post" action="https://blackboard.usc.edu/webapps/blackboard/execute/announcement"><input type="hidden" name="method" value="search" id="method"><input type="hidden" name="viewChoice" value="3" id="viewChoice"><input type="hidden" name="editMode" value="false" id="editMode"><input type="hidden" name="tabAction" value="false" id="tabAction"><input type="hidden" name="announcementId" value="" id="announcementId"><input type="hidden" name="course_id" value="" id="course_id"><input type="hidden" name="context" value="mybb" id="context"><input type="hidden" name="internalHandle" value="my_announcements" id="internalHandle">
        <div class="announcementFilter u_reverseAlign">
            <label for="searchSelectId" class="hideoff">Search:</label>
            <select name="searchSelect" id="searchSelectId">
                <option value="announcement.showall.label">Show All</option>
                <option value="announcement.institutiononly.label">Institution Only</option>
                <option value="announcement.coursesonly.label">Courses Only</option>
                <option value="_254398_1">-20202_op_100_op00002: Online Orientation Experience - Office of Orientation Programs</option>
                <option value="_251705_1">-20203_csci_103_29920: Introduction to Programming</option>
                <option value="_274692_1">-20213_csci_270_30263: Introduction to Algorithms and Theory of Computing</option>
                <option value="_275718_1">-20213_math_225_39541: Linear Algebra and Linear Differential Equations</option>
                <option value="_290094_1">-20221_baep_470_14402: The Entrepreneurial Mindset- Taking the Leap</option>
                <option value="_286243_1">-20221_csci_310_29967: Software Engineering</option>
                <option value="_285197_1">-20221_musc_102_47203: World Music</option>
                <option value="_287838_1">-20221_writ_340_66843: Advanced Writing</option>
                <option value="_292574_1">-Introduction to Computer Systems (30160,30234)</option>
                <option value="announcement.organizationsonly.label">Organizations Only</option>
            </select>


            <a role="button" href="https://blackboard.usc.edu/webapps/blackboard/execute/announcement?method=search#" onclick="location.href=&quot;javascript:document.announcementForm.submit()&quot;;" class="genericButton">
                Go
            </a>

        </div>
        <ul id="announcementList" class="announcementList announcementList-read">

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_722519_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_5">
                    Explore Los Angeles with USC Orientation</h3>

                <div class="details">
                    <p><span>Posted on: Monday, August 10, 2020 3:19:59 PM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <table border="0" style="width: 598px; height: 555px;">
                            <tbody>
                                <tr>
                                    <td><img src="./RawAnnouncements_files/xid-31286990_2" width="350" height="197" style="display: block; margin-left: auto; margin-right: auto;"></td>
                                </tr>
                                <tr>
                                    <td style="text-align: justify;">
                                        <p>Join <strong>USC Orientation</strong> as we take you on a journey through some of Los Angeles' most prominent sights,&nbsp;sounds, and eateries!&nbsp;There is something here for everyone and there is <strong>no RSVP required</strong>!&nbsp;Check out the event descriptions in the <strong>Explore Los Angeles</strong> section of the Trojan Engagement Center on Blackboard! We hope to see you there!<span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span><span style="font-size: 13px;"></span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: justify;"><span style="font-size: large;"><strong>Thursday,&nbsp;August 13th</strong></span></td>
                                </tr>
                                <tr>
                                    <td>9:00 am (PST) | Explore LA:&nbsp;Olympics&nbsp;&amp; Professional Sports |&nbsp;<a href="https://usc.zoom.us/j/91233788519">https://usc.zoom.us/j/91233788519</a></td>
                                </tr>
                                <tr>
                                    <td>11:00 am (PST) | Explore LA: Restaurants &amp; Eateries |&nbsp; <a href="https://usc.zoom.us/j/93187317393">https://usc.zoom.us/j/93187317393</a></td>
                                </tr>
                                <tr>
                                    <td>6:00 pm (PST) | Explore LA: SoCal&nbsp;Scenery &amp; Landmarks |&nbsp; <a href="https://usc.zoom.us/j/95264410694">https://usc.zoom.us/j/95264410694</a></td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><span style="font-size: large;"><strong>Friday, August 14th</strong></span></td>
                                </tr>
                                <tr>
                                    <td>9:00 am (PST) | Explore LA: Historic Neighborhoods |&nbsp; <a href="https://usc.zoom.us/j/93580321770">https://usc.zoom.us/j/93580321770</a></td>
                                </tr>
                                <tr>
                                    <td>5:00 pm (PST) | Explore LA: Entertainment &amp; Hollywood |&nbsp; <a href="https://usc.zoom.us/j/95546079320">https://usc.zoom.us/j/95546079320</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p></p>
                    <p><span>Course Link</span><a href="https://blackboard.usc.edu/webapps/blackboard/content/launchLink.jsp?ann_id=_722519_1&amp;course_id=_254398_1&amp;mode=view">/Trojan Engagement Center/USC Welcome Experience | Explore Los Angeles | Zoom links inside!</a></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Solomon Matthews</p>
                    <p><span>Posted to:</span> 20202_op_100_op00002: Online Orientation Experience - Office of Orientation Programs</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_710975_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_6">
                    Welcome to USC's Online Orientation Experience</h3>

                <div class="details">
                    <p><span>Posted on: Tuesday, May 26, 2020 4:32:07 PM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <h4 id="anonymous_element_7"><strong><span style="color: #990000;"><span style="font-family: &#39;trebuchet ms&#39;, geneva; font-size: 15.6px;">Welcome to USC's </span>Online<span style="font-family: &#39;trebuchet ms&#39;, geneva; font-size: 15.6px;">&nbsp;Orientation Experience!</span></span></strong></h4>
                        <h6 id="anonymous_element_8"><strong><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Blackboard will serve as the official hub for all new students this summer!</span></strong></h6>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Within this announcement, you will find <span style="text-decoration: underline;">reminders</span> for tasks that need to be completed soon,&nbsp;guidance on&nbsp;<span style="text-decoration: underline;">next steps</span>, and&nbsp;information about <span style="text-decoration: underline;">new opportunities</span> available to you.</span></p>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva; color: #000000;">Be sure to check Blackboard regularly for the latest information!</span></p>
                        <p><br></p>
                        <p><span style="text-decoration: underline;"><span style="font-family: &#39;trebuchet ms&#39;, geneva; color: #990000;"><strong>Reminders:</strong></span></span></p>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva;">- RSVP for Online&nbsp;Orientation Experience/Permit to Register (<span style="color: #990000;"><a href="https://esdweb.esd.usc.edu/orientationevents" target="_blank"><span style="color: #990000;">Click Here</span></a></span>)</span></p>
                        <ul>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">RSVPs are accepted 8:30am-7:00pm (PST) | Monday - Friday</span></li>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Monday, May 25th - USC is closed in observance of Memorial Day.</span></li>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">RSVPs&nbsp;may resume Tuesday, May 26th at 8:30am (PST).</span></li>
                        </ul>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva;">- Complete Pre-Registration Checklist (Blackboard).</span></p>
                        <ul>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">USC Academic Requirements</span></li>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Placement Exams</span></li>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Academic Advising (Pre-Advisement Worksheet)</span></li>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Preparing for Course Registration</span></li>
                        </ul>
                        <p><br></p>
                        <p><span style="text-decoration: underline;"><span style="font-family: &#39;trebuchet ms&#39;, geneva; color: #990000;"><strong>Next Steps in USC Online Orientation Experience:</strong></span></span></p>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva;"> - Complete Next Steps Module (Blackboard).</span></p>
                        <ul>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Request USCard</span></li>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Learn how to access myUSC&nbsp;&amp; USC e-mail</span></li>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Learn about FERPA</span></li>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Learn about OASIS for Guests</span></li>
                            <li><span style="font-family: &#39;trebuchet ms&#39;, geneva;">Passport Verification (for International Students)</span></li>
                        </ul>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva; color: #990000;"><strong><span style="color: #000000; font-family: &#39;trebuchet ms&#39;, geneva; font-size: 13px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: #ffffff; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"></span></strong></span><span style="font-family: &#39;trebuchet ms&#39;, geneva; font-size: 13px;">- On Monday, June 1st you will be able to begin your Academic Experience.&nbsp;</span></p>
                        <p><br></p>
                        <p><span style="text-decoration: underline; color: #990000;"><span style="font-family: &#39;trebuchet ms&#39;, geneva;"><strong>Trojan Engagement Center:&nbsp;</strong></span></span></p>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva; color: #000000;">- Watch the official USC Welcome Video.</span></p>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva; color: #000000;">- Sign up for a live, 45-minute Virtual Tour of USC's amazing campus.<br></span></p>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva; color: #000000;">- Head to the Fall Freshmen Message Board to connect with other new students.</span></p>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva; color: #000000;">- Check out the Resource Hub for opportunities available to all USC students!</span></p>
                        <p><br></p>
                        <p><span style="font-family: &#39;trebuchet ms&#39;, geneva; color: #000000;">Questions? Contact us at orient@usc.edu.<br></span></p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Solomon Matthews</p>
                    <p><span>Posted to:</span> 20202_op_100_op00002: Online Orientation Experience - Office of Orientation Programs</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_728482_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_9">
                    Piazza Discussion Board</h3>

                <div class="details">
                    <p><span>Posted on: Monday, August 17, 2020 3:41:57 PM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p class="bottom_margin">This term we will be using Piazza for class discussion. The system is highly catered to getting you help fast and efficiently from classmates, the TA, and myself. Rather than emailing questions to the teaching staff, I encourage you to post your questions on Piazza. If you have any problems or feedback for the developers, email team@piazza.com.</p>
                        <p class="bottom_margin">Find our class signup link at: https://<span class="class-link" href="https://piazza.com/usc/fall2020/csci103l">piazza.com/usc/fall2020/csci103l</span></p>
                        <p><br></p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Andrew Paul Goodney</p>
                    <p><span>Posted to:</span> 20203_csci_103_29920: Introduction to Programming</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_728397_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_10">
                    Zoom Meetings for All Sections</h3>

                <div class="details">
                    <p><span>Posted on: Wednesday, August 19, 2020 11:02:04 AM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Greetings CSCI 103L Students! Some of you need access to Zoom links that are not the section in which you're registered.</p>
                        <p>This is OK! You can attend any lecture. Here are the links:</p>
                        <table dir="ltr" cellspacing="0" cellpadding="0" border="1">
                            <tbody>
                                <tr>
                                    <td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Lecture Time&quot;}">Lecture Time</td>
                                    <td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Section Number&quot;}">Section Number</td>
                                    <td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;Zoom Link&quot;}">Zoom Link</td>
                                </tr>
                                <tr>
                                    <td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;T/TH 9:30 AM&quot;}">T/TH 9:30 AM</td>
                                    <td data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:29934}">29934</td>
                                    <td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;https://usc.zoom.us/j/96826758368?pwd=VHNNN2JFL0JpQjRRamVqWE9kdlI1dz09&quot;}" data-sheets-hyperlink="https://usc.zoom.us/j/96826758368?pwd=VHNNN2JFL0JpQjRRamVqWE9kdlI1dz09">
                                        <div>
                                            <div>
                                                <a class="in-cell-link" href="https://usc.zoom.us/j/96826758368?pwd=VHNNN2JFL0JpQjRRamVqWE9kdlI1dz09" target="_blank" rel="noopener">Open</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;T/TH 11:00 AM&quot;}">T/TH 11:00 AM</td>
                                    <td data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:29920}">29920</td>
                                    <td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;https://usc.zoom.us/j/95574234934?pwd=bExrSmdHZyt0S2RmWXdheCtMbXFldz09&quot;}" data-sheets-hyperlink="https://usc.zoom.us/j/95574234934?pwd=bExrSmdHZyt0S2RmWXdheCtMbXFldz09">
                                        <div>
                                            <div>
                                                <a class="in-cell-link" href="https://usc.zoom.us/j/95574234934?pwd=bExrSmdHZyt0S2RmWXdheCtMbXFldz09" target="_blank" rel="noopener">Open</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;T/TH 2:00 PM&quot;}">T/TH 2:00 PM</td>
                                    <td data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:30186}">30186</td>
                                    <td data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;https://usc.zoom.us/j/92873470746?pwd=Ni9BVitsWkEvV0lZRDUvZzVPMWMvQT09&quot;}" data-sheets-hyperlink="https://usc.zoom.us/j/92873470746?pwd=Ni9BVitsWkEvV0lZRDUvZzVPMWMvQT09">
                                        <div>
                                            <div>
                                                <a class="in-cell-link" href="https://usc.zoom.us/j/92873470746?pwd=Ni9BVitsWkEvV0lZRDUvZzVPMWMvQT09" target="_blank" rel="noopener">Open</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Andrew Paul Goodney</p>
                    <p><span>Posted to:</span> 20203_csci_103_29920: Introduction to Programming</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_726859_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_11">
                    Welcome to CSCI 103L in Fall 2020</h3>

                <div class="details">
                    <p><span>Posted on: Monday, August 17, 2020 2:41:03 PM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Quick Hits:</p>
                        <p>Course website: http://bytes.usc.edu/cs103/ (will be updated soon)</p>
                        <p>Zoom meetings for this section: Click the "USC Zoom Meeting Pro" link.</p>
                        <p>"See" you soon!</p>
                        <p>-Prof. Goodney</p>
                        <p><br></p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Andrew Paul Goodney</p>
                    <p><span>Posted to:</span> 20203_csci_103_29920: Introduction to Programming</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_920562_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_12">
                    Office Hours Study Week UPDATED</h3>

                <div class="details">
                    <p><span>Posted on: Monday, December 6, 2021 7:18:06 PM PST</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Hi everyone,</p>
                        <p>I apologize for the change, but my office hours will be on FRIDAY 12/10 from 1PM to 4PM, at the math center. Please email me if you have any questions.&nbsp;&nbsp;</p>
                        <p>Best,</p>
                        <p>Tina</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Tina Peng</p>
                    <p><span>Posted to:</span> 20213_math_225_39541: Linear Algebra and Linear Differential Equations</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_918240_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_13">
                    Office Hours Study Week</h3>

                <div class="details">
                    <p><span>Posted on: Thursday, December 2, 2021 9:03:07 AM PST</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>My office hours next week will be on 12/8 from 9AM-12PM at the math center. Hopefully everyone is able to make it if they need help. If you really cannot, you can email me questions, and we'll figure something out. Good luck studying everyone!</p>
                        <p>-Tina</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Tina Peng</p>
                    <p><span>Posted to:</span> 20213_math_225_39541: Linear Algebra and Linear Differential Equations</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_902033_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_14">
                    8AM Discussion Session Correction from Today</h3>

                <div class="details">
                    <p><span>Posted on: Thursday, October 28, 2021 10:38:59 AM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Hello 8AM,</p>
                        <p>I believe it was question 3 from 6.4, when I reduce the matrix, I ended up getting rid of -8 in the second column. THIS IS NOT CORRECT! This was an algebraic error. You should end up with the third row being zeros and the pivots are in fact in the first and SECOND COLUMNS, not the third. Please change this in your assignment. Thank you!</p>
                        <p>Best,</p>
                        <p>Tina</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Tina Peng</p>
                    <p><span>Posted to:</span> 20213_math_225_39541: Linear Algebra and Linear Differential Equations</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_897246_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_15">
                    Discussion Session Online Tomorrow</h3>

                <div class="details">
                    <p><span>Posted on: Tuesday, October 19, 2021 12:36:01 AM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Hello everyone,</p>
                        <p>I apologize for the inconvenience, but I need to teach discussion session tomorrow (10/19) via zoom due to unforeseen circumstances.</p>
                        <p>Best,</p>
                        <p>Tina</p>
                        <p><br></p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Tina Peng</p>
                    <p><span>Posted to:</span> 20213_math_225_39541: Linear Algebra and Linear Differential Equations</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_889927_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_16">
                    Class and Office Hours Zoom Only!</h3>

                <div class="details">
                    <p><span>Posted on: Monday, October 4, 2021 12:34:54 PM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Hello everyone,&nbsp;</p>
                        <p>Discussion sessions T/Thu and office hours will all be on zoom this week. I am dealing with a family emergency and am out of state. I apologize for any inconvenience that this may cause. Please let me know if you have any questions. The zoom link will be available on Blackboard under the USC Zoom Pro Meeting tab.&nbsp;</p>
                        <p>-Tina</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Tina Peng</p>
                    <p><span>Posted to:</span> 20213_math_225_39541: Linear Algebra and Linear Differential Equations</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_888085_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_17">
                    Discussion Session Cancelled 9/30</h3>

                <div class="details">
                    <p><span>Posted on: Wednesday, September 29, 2021 11:52:13 PM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Hello everybody,</p>
                        <p>I am cancelling discussion session tomorrow morning (9/30), as I am not feeling well. Please email me if you have any questions or concerns. I will see everyone as usual next Tuesday.</p>
                        <p>-Tina&nbsp;</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Tina Peng</p>
                    <p><span>Posted to:</span> 20213_math_225_39541: Linear Algebra and Linear Differential Equations</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_885795_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_18">
                    Homework Grader</h3>

                <div class="details">
                    <p><span>Posted on: Sunday, September 26, 2021 11:19:47 AM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>We have a grader for our class; his name is Larry Gu. Here is his email:</p>
                        <p>ljgu@usc.edu</p>
                        <p>If you have questions on the grading of homeworks, please reach out to him. I will be grading quizzes.&nbsp;</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Tina Peng</p>
                    <p><span>Posted to:</span> 20213_math_225_39541: Linear Algebra and Linear Differential Equations</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_875864_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_19">
                    Official Office Hours</h3>

                <div class="details">
                    <p><span>Posted on: Wednesday, September 8, 2021 9:10:49 AM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Math Center (also available through zoom):</p>
                        <p>Tuesday 10AM-11AM</p>
                        <p>Wednesday 9AM-10AM</p>
                        <p>Thursday 10AM-11AM</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Tina Peng</p>
                    <p><span>Posted to:</span> 20213_math_225_39541: Linear Algebra and Linear Differential Equations</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_870473_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_20">
                    Office Hours This Week Only</h3>

                <div class="details">
                    <p><span>Posted on: Sunday, August 29, 2021 3:21:16 PM PDT</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Hello everyone,</p>
                        <p>I will be in the math center in person from 10AM to 1PM on Tuesday for my office hours this week. An official schedule will start next week, and I will make an announcement then. I will also have a zoom call going for those who do not want to meet in person. This link should be available on the usc math center website, but if not, I'll make an announcement with the link on Tuesday. Let me know if you have any questions.&nbsp;</p>
                        <p>Best,</p>
                        <p>Tina</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Tina Peng</p>
                    <p><span>Posted to:</span> 20213_math_225_39541: Linear Algebra and Linear Differential Equations</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_930056_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_21">
                    Welcome to CS 310</h3>

                <div class="details">
                    <p><span>Posted on: Friday, January 7, 2022 3:22:03 PM PST</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Dear Students,</p>
                        <p>Welcome to CSCI 310 (Spring 2022).&nbsp;This course is an introduction to the software engineering process and software lifecycle. It covers project management, requirements, architecture, design, implementation, testing, and maintenance activities in individual and team based projects.&nbsp;</p>
                        <p>Blackboard:&nbsp; We will use Blackboard to post lecture slides and homework assignments. This is also where you will submit your homework and projects.</p>
                        <p>Piazza:&nbsp; We will use Piazza to answer your questions on the course materials. Piazza is highly catered to getting you help fast and efficiently from the teaching staff and your own classmates. Rather than emailing questions to us, you are encouraged to post questions on Piazza. The link is: piazza.com/usc/spring2022/csci310 and we have added everyone listed in the roster. If for some reason you are not added, please let me know.</p>
                        <p>GitHub: If you do not already have a GitHub account and username, please sign up for one using your USC email. You will be asked to use it for some of your coding assignments.</p>
                        <p>I look forward to the start of the spring semester, meeting all of you, and helping you learn lots of important software engineering skills!</p>
                        <p>Sincerely,</p>
                        <p>Chao Wang</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Chao Wang</p>
                    <p><span>Posted to:</span> 20221_csci_310_29967: Software Engineering</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_934809_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_22">
                    Student-run GroupMe</h3>

                <div class="details">
                    <p><span>Posted on: Wednesday, January 12, 2022 11:57:41 AM PST</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Hello all-&nbsp; Kian has set up a GroupMe for the class:&nbsp; <a style="margin: 0px; padding: 0px; border-width: 0px; font-stretch: inherit; font-size: 15px; line-height: inherit; font-family: &#39;Segoe UI&#39;, &#39;Segoe UI Web (West European)&#39;, &#39;Segoe UI&#39;, -apple-system, &#39;system-ui&#39;, Roboto, &#39;Helvetica Neue&#39;, sans-serif; vertical-align: baseline; background-color: #ffffff;" data-linkindex="0" data-auth="NotApplicable" rel="noopener noreferrer" target="_blank" href="https://urldefense.com/v3/__https://groupme.com/join_group/84343145/IzWk67Dz__;!!LIr3w8kk_Xxm!8RkQW5BbpAa74cyefjohEnx8WaqF5ZZs5Y3JMFpDSKikF8H4jqE58CLwwIHgVzM$">https://groupme.com/join_group/84343145/IzWk67Dz</a></p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Scott Spencer</p>
                    <p><span>Posted to:</span> 20221_musc_102_47203: World Music</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_931744_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_23">
                    Welcome! - World Music course site is now open</h3>

                <div class="details">
                    <p><span>Posted on: Sunday, January 9, 2022 8:08:55 PM PST</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p style="margin: 0px 0px 1em; padding: 0px; border: 0px; outline: 0px; font-weight: 400; font-style: normal; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; color: #000000; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;">Hello,</p>
                        <p style="margin: 0px 0px 1em; padding: 0px; border: 0px; outline: 0px; font-weight: 400; font-style: normal; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; color: #000000; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;">This is Scott Spencer writing - I look forward to meeting you all on Monday, January 10th (via Zoom, sadly) in our first World Music class. I will open the Blackboard course now. Zoom links are in the Blackboard site.</p>
                        <p style="margin: 0px 0px 1em; padding: 0px; border: 0px; outline: 0px; font-weight: 400; font-style: normal; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; color: #000000; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; font-style: normal;">This course has no prerequisites, nor any books to purchase. &nbsp;You don't need to read music, or even like music. All readings will be found on the course website as pdfs. Please have these materials read and ready to discuss each week. We will start discussing the first readings next Monday. You will find a draft syllabus - it will change often as we have guest musicians coming in to class. Weekly content can be found in the <strong>"Content"</strong> folder, where you will find a weekly breakdown of class topics, readings, links and listening.</span></p>
                        <p style="margin: 0px 0px 1em; padding: 0px; border: 0px; outline: 0px; font-weight: 400; font-style: normal; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; color: #000000; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; font-style: normal; font-weight: 400;">This is going to be a participatory class. It will require active listening, lots of reading, lots of writing, and the necessity of getting outside of your comfort zone at times. We will explore music as a cultural phenomenon, formed by the people who play and interact with it, and shaped by the community in which it resides. As observers, your role will be to do your homework, ask questions, and then dive in to new cultures and musical forms. People love talking about their music. Your job is to be there, ask questions, and listen well.</span></p>
                        <p style="margin: 0px 0px 1em; padding: 0px; border: 0px; outline: 0px; font-weight: 400; font-style: normal; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; color: #000000; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; font-style: normal; font-weight: 400;">We are very fortunate to have a 100% guaranteed best ever Teaching Assistant (more of a teaching partner) in Mircea Gogoncea - a classical guitar impressario, polyglot and international traveller, who is finishing a DMA degree in classical guitar this year.</span></p>
                        <p style="margin: 0px 0px 1em; padding: 0px; border: 0px; outline: 0px; font-weight: 400; font-style: normal; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; color: #000000; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;"><span style="font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; font-style: normal; font-weight: 400;">Though we will be online for the first two weeks, this class will otherwise be in-person. Keep in mind that active interaction with real, live humans (students and guest musicians) will only happen synchronously. Unitl we meet in person, Mircea and I would love it if you could be active participants with cameras and comments, if possible.</span></p>
                        <p style="margin: 0px 0px 1em; padding: 0px; border: 0px; outline: 0px; font-weight: 400; font-style: normal; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; color: #000000; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;">Best wishes, and see you very shortly.</p>
                        <p style="margin: 0px 0px 1em; padding: 0px; border: 0px; outline: 0px; font-weight: 400; font-style: normal; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; color: #000000; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;">-Scott Spencer</p>
                        <p style="margin: 0px 0px 1em; padding: 0px; border: 0px; outline: 0px; font-weight: 400; font-style: normal; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: small; color: #000000; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;">scottspe@usc.edu</p>
                        <p><br></p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Scott Spencer</p>
                    <p><span>Posted to:</span> 20221_musc_102_47203: World Music</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_934646_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_24">
                    Langdon Winner essay</h3>

                <div class="details">
                    <p><span>Posted on: Wednesday, January 12, 2022 9:29:40 AM PST</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Just a quick note to let you know that the essay is now available on Blackboard.&nbsp;</p>
                        <p>Dr. Schroeder</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Amy Elizabeth Schroeder</p>
                    <p><span>Posted to:</span> 20221_writ_340_66843: Advanced Writing</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_934460_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_25">
                    HW for 1/13</h3>

                <div class="details">
                    <p><span>Posted on: Tuesday, January 11, 2022 8:51:01 PM PST</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Hi all,&nbsp;</p>
                        <p>It was lovely to meet you in class today. For Thursday, please read the essay by Langdon Winner, "Do Artifacts Have Politics?" (The essay can be found under Content on Bb.) Please come to class with three questions and three comments about the essay.&nbsp;</p>
                        <p>See you in class,&nbsp;</p>
                        <p>Dr. Schroeder</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Amy Elizabeth Schroeder</p>
                    <p><span>Posted to:</span> 20221_writ_340_66843: Advanced Writing</p>
                </div>
            </li>

            <!-- showOnCourses can be true only for system announcements -->
            <li class="clearfix" id="_933783_1">
                <h3 class="item" style="color:#000000; cursor: default; background: transparent" id="anonymous_element_26">
                    Zoom link for class today</h3>

                <div class="details">
                    <p><span>Posted on: Tuesday, January 11, 2022 11:27:54 AM PST</span></p>
                    <p></p>
                    <div class="vtbegenerated">
                        <p>Hello class,&nbsp;</p>
                        <p>I look forward to meeting you later today for our first class! Zoom links have been populated for all classes over the semester, but in case you are having any difficulty accessing the link, here is an invitation to WRIT 340. I will see you soon!</p>
                        <p>Professor Schroeder</p>
                        <p>Amy Schroeder is inviting you to a scheduled Zoom meeting.</p>
                        <p>Topic: 20221:66843:WRIT-340 Advanced Writing<br>Time: Jan 11, 2022 05:00 PM Pacific Time (US and Canada)<br>&nbsp; &nbsp; &nbsp;</p>
                        <p>Join Zoom Meeting<br><a href="https://usc.zoom.us/j/95880941996?pwd=NHZ1Q29IRjlKbHFmYUhabXNSQWNZZz09">https://usc.zoom.us/j/95880941996?pwd=NHZ1Q29IRjlKbHFmYUhabXNSQWNZZz09</a></p>
                        <p>Meeting ID: 958 8094 1996<br>Passcode: FR9wI4_1k7<br>One tap mobile<br>+13126266799,,95880941996# US (Chicago)<br>+16468769923,,95880941996# US (New York)</p>
                        <p>Dial by your location<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 312 626 6799 US (Chicago)<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 646 876 9923 US (New York)<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 301 715 8592 US (Washington DC)<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 346 248 7799 US (Houston)<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 669 900 6833 US (San Jose)<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 253 215 8782 US (Tacoma)<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 204 272 7920 Canada<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 438 809 7799 Canada<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 587 328 1099 Canada<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 613 209 3054 Canada<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 647 374 4685 Canada<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 647 558 0588 Canada<br>&nbsp; &nbsp; &nbsp; &nbsp; +1 778 907 2071 Canada<br>Meeting ID: 958 8094 1996<br>Find your local number: <a href="https://usc.zoom.us/u/ach2srgX3e">https://usc.zoom.us/u/ach2srgX3e</a></p>
                        <p>Join by SIP<br>95880941996@zoomcrc.com</p>
                        <p>Join by H.323<br>162.255.37.11 (US West)<br>162.255.36.11 (US East)<br>115.114.131.7 (India Mumbai)<br>115.114.115.7 (India Hyderabad)<br>213.19.144.110 (Amsterdam Netherlands)<br>213.244.140.110 (Germany)<br>103.122.166.55 (Australia Sydney)<br>103.122.167.55 (Australia Melbourne)<br>149.137.40.110 (Singapore)<br>64.211.144.160 (Brazil)<br>149.137.68.253 (Mexico)<br>69.174.57.160 (Canada Toronto)<br>65.39.152.160 (Canada Vancouver)<br>207.226.132.110 (Japan Tokyo)<br>149.137.24.110 (Japan Osaka)<br>Meeting ID: 958 8094 1996<br>Passcode: 7768728641</p>
                    </div>
                    <p></p>
                </div>

                <div class="announcementInfo">
                    <p><span>Posted by:</span> Amy Elizabeth Schroeder</p>
                    <p><span>Posted to:</span> 20221_writ_340_66843: Advanced Writing</p>
                </div>
            </li>

        </ul>

    </form>
</div>
`

let easyParse = `
    <img href="123123"w />yeesh <div className="fuckyou"> jesus c    </div><span>WOAH </span>
`
//https://blackboard.usc.edu/webapps/blackboard/execute/announcement?method=search
;(() => {
    const res = parseBlackboardAnnouncements(ann);

    // console.log('res:')
    // console.log(res);
})();