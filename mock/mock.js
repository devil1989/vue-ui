var data= {

	//mock的url
 	"crm/OrganizationV2/GetNodeByUserId":{

 		//这个就是返回的数据
		"nodeList": [{
			"id": 1,
			"isActive": 1,
			"nodeName": "网校",
			"nodeAttr": [],
			"children": [{
				"id": 1,
				"isActive": 1,
				"nodeAttr": [],
				"nodeName": "机构-沿途",
				"parentId": 0,
				"children": [{
					"id": 1,
					"isActive": 1,
					"nodeName": "业务单元A",
					"nodeAttr": [],
					"parentId": 0,
					"children": []
				}, {
					"id": 1,
					"isActive": 1,
					"nodeAttr": [],
					"nodeName": "业务单元B",
					"parentId": 0,
					"children": []
				}]
			}, {
				"id": 1,
				"isActive": 1,
				"nodeAttr": [],
				"nodeName": "机构-2",
				"parentId": 0,
				"children": []
			}]
		}],
		"status": 0,
		"message": "组织机构设置"
	}
};

export {data}
					