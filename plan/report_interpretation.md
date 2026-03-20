# 报告解读功能测试计划

## Application Overview

基于北大医生IM聊天页面的报告解读功能综合测试计划，验证体检报告（图片/PDF格式）解析及四单（门诊单、检查单、检验单、处方单）解析功能的准确性与完整性。

## Test Scenarios

### 1. 报告解读场景验证

**Seed:** `seed.spec.ts`

#### 1.1. 体检报告解读 - 图片格式

**File:** `report_interpretation/physical_exam_report_image.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
     - expect: 页面成功加载并显示AI医生标题
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 上传体检报告图片文件
     - expect: 图片文件上传成功
     - expect: 图片在对话中展示
  4. 等待AI解析报告
     - expect: AI返回报告解读内容
     - expect: 解读内容包含关键指标分析

#### 1.2. 体检报告解读 - PDF格式

**File:** `report_interpretation/physical_exam_report_pdf.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 等待页面完全加载
     - expect: 聊天输入框正常显示
  3. 上传PDF格式体检报告文件
     - expect: PDF文件上传成功
     - expect: PDF在对话中展示
  4. 等待AI解析报告
     - expect: AI返回PDF报告解读内容
     - expect: 解读内容包含关键指标分析

#### 1.3. 门诊单解析

**File:** `report_interpretation/outpatient_slip_parsing.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 上传门诊单图片
     - expect: 门诊单上传成功
  3. 等待AI解析门诊单
     - expect: AI返回门诊单解读内容
     - expect: 解读内容包含诊断、用药等关键信息

#### 1.4. 检查单解析

**File:** `report_interpretation/examination_slip_parsing.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 上传检查单图片
     - expect: 检查单上传成功
  3. 等待AI解析检查单
     - expect: AI返回检查单解读内容
     - expect: 解读内容包含检查指标分析

#### 1.5. 检验单解析

**File:** `report_interpretation/lab_report_parsing.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 上传检验单图片
     - expect: 检验单上传成功
  3. 等待AI解析检验单
     - expect: AI返回检验单解读内容
     - expect: 解读内容包含检验指标分析及参考值对比

#### 1.6. 处方单解析

**File:** `report_interpretation/prescription_parsing.spec.ts`

**Steps:**
  1. 访问登录并跳转到IM页面
     - expect: 登录成功并自动跳转到IM页面
  2. 上传处方单图片
     - expect: 处方单上传成功
  3. 等待AI解析处方单
     - expect: AI返回处方单解读内容
     - expect: 解读内容包含用药说明、注意事项等信息
