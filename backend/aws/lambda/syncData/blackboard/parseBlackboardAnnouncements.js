const {
    getValueByDelimiters
} = require('../functions/requestFunctions');

const parseBlackboardAnnouncements = (announcements) => {


    let announcementBlock = getValueByDelimiters(announcements, '<form name="announcementForm" id="announcementForm" method="post" action="https://blackboard.usc.edu/webapps/blackboard/execute/announcement">', '</form>')

    let returnAnnouncements = [

    ]

    // Could use this:
    // <!-- showOnCourses can be true only for system announcements -->
    while (announcementBlock.indexOf('<li') !== -1) {


        let announcementInfo = getValueByDelimiters(announcementBlock, '<div class="announcementInfo">', '</div>')
        let postedBy = getValueByDelimiters(announcementInfo, '<p><span>Posted by:</span>', '</p>').trim();
        let postedTo = getValueByDelimiters(announcementInfo, '<p><span>Posted to:</span>', '</p>').trim();

        let liBlock = getValueByDelimiters(announcementBlock, '<li', '<div class="announcementInfo">')

        let title = getValueByDelimiters(liBlock, '<h3', 'h3>')
        title = getValueByDelimiters(title, '">', '</').trim()

        let details = liBlock.substring(liBlock.indexOf('<div class="details">'))
        let postedOn = getValueByDelimiters(liBlock, '<p><span>Posted on:', '</span></p>').trim()

        // details = details.substring(details.indexOf('<div class="vtbegenerated">'))
        details = getValueByDelimiters(details, '<p></p>', '<p></p>')
        details = removeStyling(details);
        console.log(`\t${title} on ${postedOn}`)
        console.log(`${postedBy} to ${postedTo}`)
        console.log(details)

        returnAnnouncements.push({
            announcementTitle: title,
            postedBy: postedBy,
            postedOn: postedOn,
            postedTo: postedTo, //className
            details: details
        })

        

        announcementBlock = announcementBlock.substring(announcementBlock.indexOf('<div class="announcementInfo">') + '<div class="announcementInfo">'.length);
    }

    return returnAnnouncements;
}

const removeStyling = (parsingAnnouncementBlock) => {
    // Try to remove all inline styling
    let editedAnnouncementBlock = '';
    while (parsingAnnouncementBlock.search('<') !== -1) {
        // // console.log(`editedAnnouncementBlock: ${editedAnnouncementBlock}`)
        let search = parsingAnnouncementBlock.search('<');
        // If its a closing tag
        if (parsingAnnouncementBlock.charAt(search + 1) === '/') {

            editedAnnouncementBlock = editedAnnouncementBlock + parsingAnnouncementBlock.substring(0, search + 1)

            parsingAnnouncementBlock = parsingAnnouncementBlock.substring(search + 1);
            continue;
        }

        // Where we start
        // i.e. <img href=""><div> What's up </div></img> etc
        let parsingBlockSubstring = parsingAnnouncementBlock.substring(search);

        // should be like <img or <img/> or <img> or <img /> or sumn
        let tag = parsingBlockSubstring.substring(0, parsingBlockSubstring.indexOf('>') + 1).split(' ')[0]

        // console.log(`tag: ${tag}`)

        // if its <img
        if (!tag.includes('>')) {
            // console.log(`First if`)
            // Remove the guts
            let endIndex = parsingBlockSubstring.indexOf('>');

            // If its a single line tag i.e. <img href="" />
            if (parsingBlockSubstring.charAt(endIndex - 1) === "/") {
                editedAnnouncementBlock = editedAnnouncementBlock + parsingAnnouncementBlock.substring(0, search) + tag + "/>"
                parsingAnnouncementBlock = parsingAnnouncementBlock.substring(search + endIndex + 1);

                continue;
            }
            // If its a regular tag i.e. <img href="" > .... </img>
            else {
                editedAnnouncementBlock = editedAnnouncementBlock + parsingAnnouncementBlock.substring(0, search) + tag + ">"
                parsingAnnouncementBlock = parsingAnnouncementBlock.substring(search + endIndex + 1);
                continue;
            }
        }
        // If its <img/>
        else if (tag.includes('/>')) {
            // console.log('seocnd if')
            editedAnnouncementBlock = editedAnnouncementBlock + parsingAnnouncementBlock.substring(0, search) + tag 
            parsingAnnouncementBlock = parsingAnnouncementBlock.substring(search + tag.length);
            continue;
        }
        // If its <img>
        else if (tag.includes('>')) {
            // console.log('third if')
            editedAnnouncementBlock = editedAnnouncementBlock + parsingAnnouncementBlock.substring(0, search) + tag 
            parsingAnnouncementBlock = parsingAnnouncementBlock.substring(search + tag.length);
            continue;
        }
        else {
            // console.log('wha')
        }

    }

    editedAnnouncementBlock = editedAnnouncementBlock + parsingAnnouncementBlock

    return editedAnnouncementBlock;
}

module.exports.parseBlackboardAnnouncements = parseBlackboardAnnouncements;