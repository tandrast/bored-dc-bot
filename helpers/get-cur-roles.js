let fs = require('fs');
const path = require('path');

function getRoles()
{
	let json = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/groups.json')));
	let ret = { groupAw: [], groupAm: [], groupBw: [], groupBm: [] };
	
	json.groupA.forEach(member => {
		if (member.writer == 0) ret.groupAw.push(member.id);
		if (member.moderator == 0) ret.groupAm.push(member.id);
	});
	json.groupB.forEach(member => {
		if (member.writer == 0) ret.groupBw.push(member.id);
		if (member.moderator == 0) ret.groupBm.push(member.id);
	});

	return ret;
}

module.exports = { getRoles };

