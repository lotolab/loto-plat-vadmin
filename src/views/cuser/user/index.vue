<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="关键字" prop="keywords" label-width="120px">
        <el-input
          v-model="queryParams.keywords"
          placeholder="搜索账号/昵称/邮箱/姓名"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入电话"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否实名" prop="isReal">
        <el-select v-model="queryParams.isReal" placeholder="请选择是否实名" clearable>
          <el-option
            v-for="dict in loto_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
  

      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['cuser:user:add']"
        >新增</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['cuser:user:edit']"
        >修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['cuser:user:remove']"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['cuser:user:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="用户ID" align="center" prop="cid" /> -->
      <el-table-column label="头像" align="center" prop="avatar" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.avatar" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="用户" align="center" prop="ucode" />
      <!-- <el-table-column label="昵称" align="center" prop="nickname" />
      <el-table-column label="名称" align="center" prop="name" /> -->
      <el-table-column label="是否实名" align="center" prop="isReal">
        <template #default="scope">
          <dict-tag :options="loto_yes_no" :value="scope.row.isReal"/>
        </template>
      </el-table-column>
      <el-table-column label="姓名/昵称/邮箱" align="left" class-name="small-padding fixed-width">
        <template #default="scope">
          <loto-cell :vols="[scope.row.name,scope.row.nickname,scope.row.email]" separator=" | "/>
        </template>
      </el-table-column>

      <!-- <el-table-column label="邮箱" align="center" prop="email" /> -->
      <el-table-column label="电话" align="center" prop="phone" />
      <el-table-column label="所属平台" align="center" prop="platform" />
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="用户角色" align="center" prop="type" />
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="loto_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <!-- <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['cuser:user:edit']">修改</el-button> -->
          <el-button link type="primary" icon="View" @click="handleDetail(scope.row)" v-hasPermi="['cuser:user:detail']">查看明细</el-button>
          <!-- <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['cuser:user:remove']">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改前端用户对话框 -->
    <el-dialog :title="title" v-model="open" width="55%" append-to-body>
      <el-form ref="userRef" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">

          </el-col>
          <el-col :span="8">
            
          </el-col>
          <el-col :span="8">
            
          </el-col>
          <el-col :span="8">
            <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" readonly/>
        </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" readonly/>
        </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" readonly/>
        </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话" readonly/>
        </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="所属平台" prop="platform">
          <el-input v-model="form.platform" placeholder="请输入所属平台" readonly/>
        </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否实名" prop="isReal">
          <dict-tag :options="loto_yes_no" :value="form.isReal"/>
        </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" readonly/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">关 闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="User">
import { listUser, getUser, delUser, addUser, updateUser } from "@/api/cuser";

const { proxy } = getCurrentInstance();
const { loto_yes_no, loto_status } = proxy.useDict('loto_yes_no', 'loto_status');

const userList = ref([]);
const lotoUserOauthList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const checkedLotoUserOauth = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    ucode: null,
    password: null,
    salt: null,
    nickname: null,
    name: null,
    isReal: null,
    email: null,
    phone: null,
    keywords:null,
  },
  rules: {
    name: [
      { required: true, message: "名称", trigger: "blur" }
    ],
    isReal: [
      { required: true, message: "是否实名", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询前端用户列表 */
function getList() {
  loading.value = true;
  listUser(queryParams.value).then(response => {
    userList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    cid: null,
    ucode: null,
    password: null,
    salt: null,
    nickname: null,
    name: null,
    isReal: null,
    avatar: null,
    email: null,
    phone: null,
    platform: null,
    remark: null,
    type: null,
    status: null,
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null
  };
  lotoUserOauthList.value = [];
  proxy.resetForm("userRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.cid);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加前端用户";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _cid = row.cid || ids.value
  getUser(_cid).then(response => {
    form.value = response.data;
    lotoUserOauthList.value = response.data.lotoUserOauthList;
    open.value = true;
    title.value = "修改前端用户";
  });
}

function handleDetail(row){
  reset();
  const _cid = row.cid || ids.value
  getUser(_cid).then(response => {
    form.value = response.data;
    lotoUserOauthList.value = response.data.lotoUserOauthList;
    open.value = true;
    title.value = "用户信息";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["userRef"].validate(valid => {
    if (valid) {
      form.value.lotoUserOauthList = lotoUserOauthList.value;
      if (form.value.cid != null) {
        updateUser(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addUser(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _cids = row.cid || ids.value;
  proxy.$modal.confirm('是否确认删除前端用户编号为"' + _cids + '"的数据项？').then(function() {
    return delUser(_cids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 三方登录序号 */
function rowLotoUserOauthIndex({ row, rowIndex }) {
  row.index = rowIndex + 1;
}

/** 三方登录添加按钮操作 */
function handleAddLotoUserOauth() {
  let obj = {};
  obj.vendorId = "";
  obj.openid = "";
  obj.unionid = "";
  obj.vendor = "";
  obj.vendorName = "";
  obj.remark = "";
  obj.status = "";
  obj.syncTime = "";
  lotoUserOauthList.value.push(obj);
}

/** 三方登录删除按钮操作 */
function handleDeleteLotoUserOauth() {
  if (checkedLotoUserOauth.value.length == 0) {
    proxy.$modal.msgError("请先选择要删除的三方登录数据");
  } else {
    const lotoUserOauths = lotoUserOauthList.value;
    const checkedLotoUserOauths = checkedLotoUserOauth.value;
    lotoUserOauthList.value = lotoUserOauths.filter(function(item) {
      return checkedLotoUserOauths.indexOf(item.index) == -1
    });
  }
}

/** 复选框选中数据 */
function handleLotoUserOauthSelectionChange(selection) {
  checkedLotoUserOauth.value = selection.map(item => item.index)
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('cuser/user/export', {
    ...queryParams.value
  }, `user_${new Date().getTime()}.xlsx`)
}

getList();
</script>
