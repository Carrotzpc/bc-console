// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from "react";

import {
  Page,
  Row,
  Col,
  Button,
  Card,
  Tabs,
  Spin,
  Descriptions,
  Typography,
  Icon,
  Table,
  Space,
  Input,
  Modal,
  FormilyForm,
  FormilySelect,
  Alert,
} from "@tenx-ui/materials";

import { useLocation, history, matchPath } from "umi";
import DataProvider from "../../components/DataProvider";

import utils, { RefsManager } from "../../utils";

import * as __$$i18n from "../../i18n";

import __$$constants from "../../constants";

import "./index.css";

class FederationDetail$$Page extends React.Component {
  _context = this;

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);
    this.location = props.self?.location;
    this.match = props.self?.match;
    this.history = props.self?.history;

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {
      current: 1,
      filter: "ALL",
      isOpenModal: false,
      modalType: "adduser",
      organizations: [],
      searchKey: "name",
      searchValue: undefined,
      size: 10,
      userCurrent: 1,
      userRecord: {},
      userSize: 10,
    };
  }

  $ = (refName) => {
    return this._refsManager.get(refName);
  };

  $$ = (refName) => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  closeModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  confirmAddUserModal(e, payload) {
    var _this$props$useGetFed,
      _this$props$useGetFed2,
      _this$$,
      _this$$$formRef,
      _this$$$formRef$curre;
    const federation =
      ((_this$props$useGetFed = this.props.useGetFederation) === null ||
      _this$props$useGetFed === void 0
        ? void 0
        : (_this$props$useGetFed2 = _this$props$useGetFed.data) === null ||
          _this$props$useGetFed2 === void 0
        ? void 0
        : _this$props$useGetFed2.federation) || {};
    const form =
      (_this$$ = this.$("formily_create")) === null || _this$$ === void 0
        ? void 0
        : (_this$$$formRef = _this$$.formRef) === null ||
          _this$$$formRef === void 0
        ? void 0
        : (_this$$$formRef$curre = _this$$$formRef.current) === null ||
          _this$$$formRef$curre === void 0
        ? void 0
        : _this$$$formRef$curre.form;
    form.submit(async (v) => {
      try {
        var _federation$initiator;
        const res =
          await this.props.appHelper.utils.bff.addOrganizationToFederation({
            name:
              federation === null || federation === void 0
                ? void 0
                : federation.name,
            organizations: v.organizations,
            initiator:
              federation === null || federation === void 0
                ? void 0
                : (_federation$initiator = federation.initiator) === null ||
                  _federation$initiator === void 0
                ? void 0
                : _federation$initiator.name,
          });
        this.closeModal();
        this.utils.notification.success({
          message: this.i18n("i18n-x26twb9oy0l"),
        });
        this.props.useGetFederation.mutate();
      } catch (error) {
        var _error$response;
        this.utils.notification.warnings({
          message: this.i18n("i18n-43getajmxf3"),
          errors:
            error === null || error === void 0
              ? void 0
              : (_error$response = error.response) === null ||
                _error$response === void 0
              ? void 0
              : _error$response.errors,
        });
      }
    });
  }

  async confirmDeleteUserModal(e, payload) {
    var _this$props$useGetFed, _this$props$useGetFed2;
    const federation =
      ((_this$props$useGetFed = this.props.useGetFederation) === null ||
      _this$props$useGetFed === void 0
        ? void 0
        : (_this$props$useGetFed2 = _this$props$useGetFed.data) === null ||
          _this$props$useGetFed2 === void 0
        ? void 0
        : _this$props$useGetFed2.federation) || {};
    try {
      var _this$state$userRecor, _federation$initiator;
      await this.props.appHelper.utils.bff.removeOrganizationToFederation({
        name:
          federation === null || federation === void 0
            ? void 0
            : federation.name,
        organization:
          (_this$state$userRecor = this.state.userRecord) === null ||
          _this$state$userRecor === void 0
            ? void 0
            : _this$state$userRecor.name,
        initiator:
          federation === null || federation === void 0
            ? void 0
            : (_federation$initiator = federation.initiator) === null ||
              _federation$initiator === void 0
            ? void 0
            : _federation$initiator.name,
      });
      this.closeModal();
      this.utils.notification.success({
        message: this.i18n("i18n-yy3f9rxigm"),
      });
      this.props.useGetFederation.mutate();
    } catch (error) {
      var _error$response;
      this.utils.notification.warnings({
        message: this.i18n("i18n-p5gea1q7fem"),
        errors:
          error === null || error === void 0
            ? void 0
            : (_error$response = error.response) === null ||
              _error$response === void 0
            ? void 0
            : _error$response.errors,
      });
    }
  }

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  handlePaginationChange(c, s) {
    this.setState({
      size: s,
      current: c,
    });
  }

  handleSearchValueChange(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  handleTableChange(pagination, filters, sorter, extra) {
    this.setState({
      pagination,
      filters,
      sorter,
    });
  }

  handleUserPaginationChange(c, s) {
    this.setState({
      size: s,
      current: c,
    });
  }

  handleUserTableChange(pagination, filters, sorter, extra) {
    this.setState({
      pagination,
      filters,
      sorter,
    });
  }

  openAddUserModal() {
    this.setState({
      isOpenModal: true,
      modalType: "adduser",
    });
  }

  openDeleteUserModal(e, payload) {
    this.setState({
      isOpenModal: true,
      modalType: "delete",
      userRecord:
        payload === null || payload === void 0 ? void 0 : payload.record,
    });
  }

  componentDidMount() {
    const getOrganizations = async () => {
      var _res$organizations;
      const res = await this.props.appHelper.utils.bff.getOrganizations();
      this.setState({
        organizations:
          (res === null || res === void 0
            ? void 0
            : (_res$organizations = res.organizations) === null ||
              _res$organizations === void 0
            ? void 0
            : _res$organizations.map((item) => ({
                value: item.name,
                label: `${item.name}(${item.admin})`,
              }))) || [],
      });
    };
    getOrganizations();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page
        ref={this._refsManager.linkRef("outerView")}
        style={{ height: "100%" }}
      >
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Button.Back
              __component_name="Button.Back"
              title={this._i18nText({
                "en-US": "federation detail",
                key: "i18n-abe4gir44un",
                "zh-CN": "联盟详情",
              })}
              type="simple"
            />
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              type="default"
            >
              <Tabs
                __component_name="Tabs"
                destroyInactiveTabPane="true"
                items={[
                  {
                    children: (
                      <Spin
                        __component_name="Spin"
                        spinning={__$$eval(
                          () => this.props.useGetFederation?.loading
                        )}
                      >
                        <Descriptions
                          __component_name="Descriptions"
                          bordered={false}
                          colon={false}
                          column={1}
                          items={[
                            {
                              children: __$$eval(
                                () =>
                                  this.props.useGetFederation?.data?.federation
                                    ?.description || "-"
                              ),
                              key: "r4gchd14zz",
                              label: this._i18nText({
                                "en-US": "federation description",
                                key: "i18n-8weq4mfy9lf",
                                "zh-CN": "联盟描述",
                              }),
                              span: 1,
                            },
                            {
                              children: (
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: "" }}
                                >
                                  {__$$eval(
                                    () =>
                                      this.props.useGetFederation?.data
                                        ?.federation?.initiator?.admin || "-"
                                  )}
                                </Typography.Text>
                              ),
                              key: "bdr5go2aun",
                              label: this._i18nText({
                                "en-US": "creator",
                                key: "i18n-yyexdt18ora",
                                "zh-CN": "创建人",
                              }),
                              span: 1,
                            },
                            {
                              children: (
                                <Typography.Text
                                  __component_name="Typography.Text"
                                  disabled={false}
                                  ellipsis={true}
                                  strong={false}
                                  style={{ fontSize: "" }}
                                >
                                  {this._i18nText({
                                    "en-US": "Real-name authentication",
                                    key: "i18n-1g6cw1w1uv4",
                                    "zh-CN": "实名认证",
                                  })}
                                </Typography.Text>
                              ),
                              key: "lu5nygtudhq",
                              label: this._i18nText({
                                "en-US": "members",
                                key: "i18n-21z9nbkoohk",
                                "zh-CN": "成员限制",
                              }),
                              span: 1,
                            },
                            {
                              children: (
                                <Typography.Time
                                  __component_name="Typography.Time"
                                  format=""
                                  relativeTime={false}
                                  time={__$$eval(
                                    () =>
                                      this.props.useGetFederation?.data
                                        ?.federation?.creationTimestamp
                                  )}
                                />
                              ),
                              key: "o0cvbxwkrj",
                              label: this._i18nText({
                                "en-US": "create time",
                                key: "i18n-9ox4rx1wtwv",
                                "zh-CN": "创建时间",
                              }),
                              span: 1,
                            },
                            {
                              children: (
                                <Typography.Time
                                  __component_name="Typography.Time"
                                  format=""
                                  time={__$$eval(
                                    () =>
                                      this.props.useGetFederation?.data
                                        ?.federation?.joinedAt
                                  )}
                                />
                              ),
                              key: "8ei6l6dk6xn",
                              label: this._i18nText({
                                "en-US": "join time",
                                key: "i18n-c0d66z03kpk",
                                "zh-CN": "加入时间",
                              }),
                              span: 1,
                            },
                            {
                              children: __$$eval(
                                () =>
                                  this.props.useGetFederation?.data?.federation
                                    ?.policy || "-"
                              ),
                              key: "mljbt4bcmo",
                              label: this._i18nText({
                                "en-US": "propsoal",
                                key: "i18n-g8rbmvh04cd",
                                "zh-CN": "提议策略",
                              }),
                              span: 1,
                            },
                          ]}
                          labelStyle={{ width: 100 }}
                          layout="horizontal"
                          size="default"
                          title={__$$eval(
                            () =>
                              this.props.useGetFederation?.data?.federation
                                ?.name || "-"
                          )}
                        >
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="r4gchd14zz"
                            label={this._i18nText({
                              "en-US": "federation description",
                              key: "i18n-8weq4mfy9lf",
                              "zh-CN": "联盟描述",
                            })}
                            span={1}
                            tab=""
                          >
                            {__$$eval(
                              () =>
                                this.props.useGetFederation?.data?.federation
                                  ?.description || "-"
                            )}
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="bdr5go2aun"
                            label={this._i18nText({
                              "en-US": "creator",
                              key: "i18n-yyexdt18ora",
                              "zh-CN": "创建人",
                            })}
                            span={1}
                            tab=""
                          >
                            {
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: "" }}
                              >
                                {__$$eval(
                                  () =>
                                    this.props.useGetFederation?.data
                                      ?.federation?.initiator?.admin || "-"
                                )}
                              </Typography.Text>
                            }
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="lu5nygtudhq"
                            label={this._i18nText({
                              "en-US": "members",
                              key: "i18n-21z9nbkoohk",
                              "zh-CN": "成员限制",
                            })}
                            span={1}
                          >
                            {
                              <Typography.Text
                                __component_name="Typography.Text"
                                disabled={false}
                                ellipsis={true}
                                strong={false}
                                style={{ fontSize: "" }}
                              >
                                {this._i18nText({
                                  "en-US": "Real-name authentication",
                                  key: "i18n-1g6cw1w1uv4",
                                  "zh-CN": "实名认证",
                                })}
                              </Typography.Text>
                            }
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="o0cvbxwkrj"
                            label={this._i18nText({
                              "en-US": "create time",
                              key: "i18n-9ox4rx1wtwv",
                              "zh-CN": "创建时间",
                            })}
                            span={1}
                          >
                            {
                              <Typography.Time
                                __component_name="Typography.Time"
                                format=""
                                relativeTime={false}
                                time={__$$eval(
                                  () =>
                                    this.props.useGetFederation?.data
                                      ?.federation?.creationTimestamp
                                )}
                              />
                            }
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="8ei6l6dk6xn"
                            label={this._i18nText({
                              "en-US": "join time",
                              key: "i18n-c0d66z03kpk",
                              "zh-CN": "加入时间",
                            })}
                            span={1}
                          >
                            {
                              <Typography.Time
                                __component_name="Typography.Time"
                                format=""
                                relativeTime={false}
                                time={__$$eval(
                                  () =>
                                    this.props.useGetFederation?.data
                                      ?.federation?.joinedAt
                                )}
                              />
                            }
                          </Descriptions.Item>
                          <Descriptions.Item
                            __component_name="Descriptions.Item"
                            key="mljbt4bcmo"
                            label={this._i18nText({
                              "en-US": "propsoal",
                              key: "i18n-g8rbmvh04cd",
                              "zh-CN": "提议策略",
                            })}
                            span={1}
                          >
                            {__$$eval(
                              () =>
                                this.props.useGetFederation?.data?.federation
                                  ?.policy || "-"
                            )}
                          </Descriptions.Item>
                        </Descriptions>
                      </Spin>
                    ),
                    key: "tab-item-1",
                    label: this._i18nText({
                      "en-US": "federation infomation",
                      key: "i18n-a7fnfkzqkks",
                      "zh-CN": "联盟信息",
                    }),
                  },
                  {
                    children: (
                      <Spin
                        __component_name="Spin"
                        spinning={__$$eval(
                          () => this.props.useGetFederation?.loading
                        )}
                      >
                        <Row __component_name="Row" wrap={true}>
                          <Col __component_name="Col" span={24}>
                            <Button
                              __component_name="Button"
                              __events={{
                                eventDataList: [
                                  {
                                    name: "onClick",
                                    relatedEventName: "openAddUserModal",
                                    type: "componentEvent",
                                  },
                                ],
                                eventList: [
                                  {
                                    disabled: true,
                                    name: "onClick",
                                    template:
                                      "onClick(event,${extParams}){\n// 点击按钮时的回调\nconsole.log('onClick', event);}",
                                  },
                                ],
                              }}
                              block={false}
                              danger={false}
                              disabled={false}
                              ghost={false}
                              icon={
                                <Icon
                                  __component_name="Icon"
                                  size={12}
                                  style={{ marginRight: 3 }}
                                  type="PlusOutlined"
                                />
                              }
                              onClick={function () {
                                this.openAddUserModal.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                              shape="default"
                              type="primary"
                            >
                              {this._i18nText({
                                "en-US": "add member",
                                key: "i18n-gwumlhyv4ub",
                                "zh-CN": "邀请成员",
                              })}
                            </Button>
                          </Col>
                          <Col __component_name="Col" span={24}>
                            <Table
                              __component_name="Table"
                              __events={{
                                eventDataList: [
                                  {
                                    name: "onChange",
                                    relatedEventName: "handleUserTableChange",
                                    type: "componentEvent",
                                  },
                                  {
                                    name: "pagination.onChange",
                                    relatedEventName:
                                      "handleUserPaginationChange",
                                    type: "componentEvent",
                                  },
                                  {
                                    name: "pagination.onShowSizeChange",
                                    relatedEventName:
                                      "handleUserPaginationChange",
                                    type: "componentEvent",
                                  },
                                ],
                                eventList: [
                                  {
                                    disabled: true,
                                    name: "onChange",
                                    template:
                                      "onChange(pagination,filters,sorter,extra,${extParams}){\n// 表格翻页事件\nconsole.log('onChange', pagination);}",
                                  },
                                  {
                                    disabled: false,
                                    name: "rowSelection.onChange",
                                    template:
                                      "onRowSelectionChange(selectedRowKeys,selectedRows,${extParams}){\n// 选中项发生变化时的回调\nconsole.log('onRowSelectionChange', selectedRowKeys, selectedRows);}",
                                  },
                                  {
                                    disabled: false,
                                    name: "expandable.onExpand",
                                    template:
                                      "onExpandableExpand(expanded,record){\n// 点击展开图标时触发\nconsole.log('onRowSelectionChange', expanded, record);}",
                                  },
                                  {
                                    disabled: true,
                                    name: "pagination.onChange",
                                    template:
                                      "onPaginationChange(page, pageSize){\n// 页码或 pageSize 改变的回调  \nconsole.log('onPaginationChange', page, pageSize);}",
                                  },
                                  {
                                    disabled: true,
                                    name: "pagination.onShowSizeChange",
                                    template:
                                      "onPaginationShowSizeChange(current, size){\n// pageSize 变化的回调\nconsole.log('onPaginationShowSizeChange', current, size);}",
                                  },
                                ],
                              }}
                              columns={[
                                {
                                  dataIndex: "name",
                                  key: "name",
                                  title: this._i18nText({
                                    "en-US": "organization",
                                    key: "i18n-gmx7l7tolvj",
                                    "zh-CN": "成员组织",
                                  }),
                                },
                                {
                                  dataIndex: "age",
                                  key: "age",
                                  render: (text, record, index) =>
                                    ((__$$context) => (
                                      <Typography.Text
                                        __component_name="Typography.Text"
                                        disabled={false}
                                        ellipsis={true}
                                        strong={false}
                                        style={{ fontSize: "" }}
                                      >
                                        {this._i18nText({
                                          "en-US": "Real-name authentication",
                                          key: "i18n-1g6cw1w1uv4",
                                          "zh-CN": "实名认证",
                                        })}
                                      </Typography.Text>
                                    ))(
                                      __$$createChildContext(__$$context, {
                                        text,
                                        record,
                                        index,
                                      })
                                    ),
                                  title: this._i18nText({
                                    "en-US": "infomation",
                                    key: "i18n-th9ag1qgsu",
                                    "zh-CN": "认证信息",
                                  }),
                                },
                                {
                                  dataIndex: "joinedAt",
                                  key: "infomation",
                                  render: (text, record, index) =>
                                    ((__$$context) => (
                                      <Typography.Time
                                        __component_name="Typography.Time"
                                        format=""
                                        time={__$$eval(() => text)}
                                      />
                                    ))(
                                      __$$createChildContext(__$$context, {
                                        text,
                                        record,
                                        index,
                                      })
                                    ),
                                  title: this._i18nText({
                                    "en-US": "join time",
                                    key: "i18n-c0d66z03kpk",
                                    "zh-CN": "加入时间",
                                  }),
                                },
                                {
                                  dataIndex: "op",
                                  key: "op",
                                  render: (text, record, index) =>
                                    ((__$$context) => (
                                      <Button
                                        __component_name="Button"
                                        __events={{
                                          eventDataList: [
                                            {
                                              name: "onClick",
                                              paramStr:
                                                '{\n \t "record":this.record \n}',
                                              relatedEventName:
                                                "openDeleteUserModal",
                                              type: "componentEvent",
                                            },
                                          ],
                                          eventList: [
                                            {
                                              disabled: true,
                                              name: "onClick",
                                              template:
                                                "onClick(event,${extParams}){\n// 点击按钮时的回调\nconsole.log('onClick', event);}",
                                            },
                                          ],
                                        }}
                                        block={false}
                                        danger={false}
                                        disabled={false}
                                        ghost={false}
                                        onClick={function () {
                                          this.openDeleteUserModal.apply(
                                            this,
                                            Array.prototype.slice
                                              .call(arguments)
                                              .concat([
                                                {
                                                  record: record,
                                                },
                                              ])
                                          );
                                        }.bind(__$$context)}
                                        shape="default"
                                        type="link"
                                      >
                                        {this._i18nText({
                                          "en-US": "delete",
                                          key: "i18n-ias68eipm18",
                                          "zh-CN": "删除",
                                        })}
                                      </Button>
                                    ))(
                                      __$$createChildContext(__$$context, {
                                        text,
                                        record,
                                        index,
                                      })
                                    ),
                                  title: this._i18nText({
                                    "en-US": "operation",
                                    key: "i18n-k5inn5jmnt9",
                                    "zh-CN": "操作",
                                  }),
                                  width: 100,
                                },
                              ]}
                              dataSource={__$$eval(() =>
                                (
                                  this.props.useGetFederation?.data?.federation
                                    ?.organizations || []
                                )?.sort((a, b) => {
                                  if (this.state.sorter?.order !== "ascend") {
                                    return (
                                      new Date(b.joinedAt).getTime() -
                                      new Date(a.joinedAt).getTime()
                                    );
                                  }
                                  return (
                                    new Date(a.joinedAt).getTime() -
                                    new Date(b.joinedAt).getTime()
                                  );
                                })
                              )}
                              loading={__$$eval(
                                () => this.props.useGetFederation?.loading
                              )}
                              onChange={function () {
                                this.handleUserTableChange.apply(
                                  this,
                                  Array.prototype.slice
                                    .call(arguments)
                                    .concat([])
                                );
                              }.bind(this)}
                              pagination={{
                                current: __$$eval(() => this.state.userCurrent),
                                onChange: function () {
                                  this.handleUserPaginationChange.apply(
                                    this,
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([])
                                  );
                                }.bind(this),
                                onShowSizeChange: function () {
                                  this.handleUserPaginationChange.apply(
                                    this,
                                    Array.prototype.slice
                                      .call(arguments)
                                      .concat([])
                                  );
                                }.bind(this),
                                pageSize: __$$eval(() => this.state.userSize),
                                showQuickJumper: false,
                                showSizeChanger: false,
                                simple: false,
                                size: "default",
                                total: __$$eval(
                                  () =>
                                    (
                                      this.props.useGetFederation?.data
                                        ?.federation?.organizations || []
                                    )?.length
                                ),
                              }}
                              rowKey="name"
                              scroll={{ scrollToFirstRowOnChange: true }}
                              showHeader={true}
                              size="default"
                            />
                          </Col>
                        </Row>
                      </Spin>
                    ),
                    key: "tab-item-2",
                    label: this._i18nText({
                      "en-US": "federation members",
                      key: "i18n-8vybx9itd3n",
                      "zh-CN": "联盟成员",
                    }),
                  },
                ]}
                size="large"
                tabPosition="top"
                type="line"
              />
            </Card>
          </Col>
          <Col __component_name="Col" span={24}>
            <Row __component_name="Row" justify="space-between" wrap={false}>
              <Col __component_name="Col">
                <Button
                  __component_name="Button"
                  block={false}
                  danger={false}
                  disabled={false}
                  ghost={false}
                  href="/network/create"
                  icon={
                    <Icon
                      __component_name="Icon"
                      size={12}
                      style={{ marginRight: 3 }}
                      type="PlusOutlined"
                    />
                  }
                  shape="default"
                  target="_self"
                  type="primary"
                >
                  {this._i18nText({
                    "en-US": "create network",
                    key: "i18n-kwbu3vyst6",
                    "zh-CN": "新建网络",
                  })}
                </Button>
              </Col>
              <Col __component_name="Col">
                <Space
                  __component_name="Space"
                  align="center"
                  direction="horizontal"
                  size="large"
                >
                  <Input.Search
                    __component_name="Input.Search"
                    __events={{
                      eventDataList: [
                        {
                          name: "onChange",
                          relatedEventName: "handleSearchValueChange",
                          type: "componentEvent",
                        },
                      ],
                      eventList: [
                        {
                          disabled: true,
                          name: "onChange",
                          template:
                            "onChange(event,${extParams}){\n// 输入框内容变化时的回调\nconsole.log('onChange',event);}",
                        },
                        {
                          disabled: false,
                          name: "onPressEnter",
                          template:
                            "onPressEnter(event,${extParams}){\n// 按下回车的回调\nconsole.log('onPressEnter',event);}",
                        },
                        {
                          disabled: false,
                          name: "onSearch",
                          template:
                            "onSearch(value,event,${extParams}){\n// 点击搜索图标、清除图标，或按下回车键时的回调\nconsole.log('onSearch',value,event);}",
                        },
                        {
                          disabled: false,
                          name: "onFocus",
                          template:
                            "onFocus(event,${extParams}){\n// 获取焦点回调\nconsole.log('onFocus',event);}",
                        },
                        {
                          disabled: false,
                          name: "onKeyDown",
                          template:
                            "onKeyDown(event,${extParams}){\n// 按键按下时的回调\nconsole.log('onKeyDown',event);}",
                        },
                        {
                          disabled: false,
                          name: "onKeyPress",
                          template:
                            "onKeyPress(event,${extParams}){\n// 按键按下后的回调\nconsole.log('onKeyPress',event);}",
                        },
                        {
                          disabled: false,
                          name: "onKeyUp",
                          template:
                            "onKeyUp(event,${extParams}){\n// 按键释放回调\nconsole.log('onKeyUp',event);}",
                        },
                        {
                          disabled: false,
                          name: "onBlur",
                          template:
                            "onBlur(event,${extParams}){\n// 按键释放回调\nconsole.log('onBlur',event);}",
                        },
                      ],
                    }}
                    onChange={function () {
                      this.handleSearchValueChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    placeholder={this._i18nText({
                      "en-US": "search",
                      key: "i18n-mrdb0wulhmc",
                      "zh-CN": "输入资源ID或网络名",
                    })}
                  />
                </Space>
              </Col>
            </Row>
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              type="default"
            >
              <Table
                __component_name="Table"
                __events={{
                  eventDataList: [
                    {
                      name: "onChange",
                      relatedEventName: "handleTableChange",
                      type: "componentEvent",
                    },
                    {
                      name: "pagination.onChange",
                      relatedEventName: "handlePaginationChange",
                      type: "componentEvent",
                    },
                    {
                      name: "pagination.onShowSizeChange",
                      relatedEventName: "handlePaginationChange",
                      type: "componentEvent",
                    },
                  ],
                  eventList: [
                    {
                      disabled: true,
                      name: "onChange",
                      template:
                        "onChange(pagination,filters,sorter,extra,${extParams}){\n// 表格翻页事件\nconsole.log('onChange', pagination);}",
                    },
                    {
                      disabled: false,
                      name: "rowSelection.onChange",
                      template:
                        "onRowSelectionChange(selectedRowKeys,selectedRows,${extParams}){\n// 选中项发生变化时的回调\nconsole.log('onRowSelectionChange', selectedRowKeys, selectedRows);}",
                    },
                    {
                      disabled: false,
                      name: "expandable.onExpand",
                      template:
                        "onExpandableExpand(expanded,record){\n// 点击展开图标时触发\nconsole.log('onRowSelectionChange', expanded, record);}",
                    },
                    {
                      disabled: true,
                      name: "pagination.onChange",
                      template:
                        "onPaginationChange(page, pageSize){\n// 页码或 pageSize 改变的回调  \nconsole.log('onPaginationChange', page, pageSize);}",
                    },
                    {
                      disabled: true,
                      name: "pagination.onShowSizeChange",
                      template:
                        "onPaginationShowSizeChange(current, size){\n// pageSize 变化的回调\nconsole.log('onPaginationShowSizeChange', current, size);}",
                    },
                  ],
                }}
                columns={[
                  {
                    dataIndex: "name",
                    key: "name",
                    title: this._i18nText({
                      "en-US": "id/name",
                      key: "i18n-03e0p0acqmaf",
                      "zh-CN": "资源ID/网络名称",
                    }),
                  },
                  {
                    dataIndex: "ordererType",
                    key: "ordererType",
                    title: this._i18nText({
                      "en-US": "type",
                      key: "i18n-oi2oqdfkq6i",
                      "zh-CN": "引擎类型",
                    }),
                  },
                  {
                    dataIndex: "organizations",
                    key: "organizations",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Text
                          __component_name="Typography.Text"
                          disabled={false}
                          ellipsis={true}
                          strong={false}
                          style={{ fontSize: "" }}
                        >
                          {__$$eval(() => text?.length || 0)}
                        </Typography.Text>
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this._i18nText({
                      "en-US": "organization",
                      key: "i18n-18ncsld69pu",
                      "zh-CN": "组织数",
                    }),
                  },
                  {
                    dataIndex: "clusterSize",
                    key: "clusterSize",
                    title: this._i18nText({
                      "en-US": "node number",
                      key: "i18n-fg85es7zp8",
                      "zh-CN": "我的节点总数",
                    }),
                  },
                  {
                    dataIndex: "creationTimestamp",
                    key: "creationTimestamp",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
                          relativeTime={false}
                          time={__$$eval(() => text)}
                        />
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this._i18nText({
                      "en-US": "create time",
                      key: "i18n-9ox4rx1wtwv",
                      "zh-CN": "创建时间",
                    }),
                  },
                  {
                    dataIndex: "expiredTime",
                    key: "expiredTime",
                    render: (text, record, index) =>
                      ((__$$context) => (
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
                          time={__$$eval(() => text)}
                        />
                      ))(
                        __$$createChildContext(__$$context, {
                          text,
                          record,
                          index,
                        })
                      ),
                    title: this._i18nText({
                      "en-US": "time",
                      key: "i18n-scjygs4e08n",
                      "zh-CN": "过期时间",
                    }),
                  },
                ]}
                dataSource={__$$eval(() =>
                  (
                    this.props.useGetFederation?.data?.federation?.networks ||
                    []
                  )
                    ?.filter((item) => {
                      return this.state.searchValue
                        ? item.name?.includes(this.state.searchValue)
                        : true;
                    })
                    ?.sort((a, b) => {
                      if (this.state.sorter?.order !== "ascend") {
                        return (
                          new Date(b.creationTimestamp).getTime() -
                          new Date(a.creationTimestamp).getTime()
                        );
                      }
                      return (
                        new Date(a.creationTimestamp).getTime() -
                        new Date(b.creationTimestamp).getTime()
                      );
                    })
                )}
                loading={__$$eval(() => this.props.useGetFederation?.loading)}
                onChange={function () {
                  this.handleTableChange.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                pagination={{
                  current: __$$eval(() => this.state.current),
                  onChange: function () {
                    this.handlePaginationChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  onShowSizeChange: function () {
                    this.handlePaginationChange.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this),
                  pageSize: __$$eval(() => this.state.size),
                  showQuickJumper: false,
                  showSizeChanger: false,
                  simple: false,
                  size: "default",
                  total: __$$eval(
                    () =>
                      ((
                        this.props.useGetFederation?.data?.federation
                          ?.networks || []
                      )
                        ?.filter((item) => {
                          return this.state.searchValue
                            ? item.name?.includes(this.state.searchValue)
                            : true;
                        })
                        ?.sort((a, b) => {
                          if (this.state.sorter?.order !== "ascend") {
                            return (
                              new Date(b.creationTimestamp).getTime() -
                              new Date(a.creationTimestamp).getTime()
                            );
                          }
                          return (
                            new Date(a.creationTimestamp).getTime() -
                            new Date(b.creationTimestamp).getTime()
                          );
                        })).length
                  ),
                }}
                rowKey="name"
                scroll={{ scrollToFirstRowOnChange: true }}
                showHeader={true}
                size="default"
              />
            </Card>
          </Col>
        </Row>
        <Modal
          __component_name="Modal"
          __events={{
            eventDataList: [
              {
                name: "onCancel",
                relatedEventName: "closeModal",
                type: "componentEvent",
              },
              {
                name: "onOk",
                relatedEventName: "confirmAddUserModal",
                type: "componentEvent",
              },
            ],
            eventList: [
              {
                disabled: false,
                name: "afterClose",
                templete:
                  "onCancel(${extParams}){\n// 完全关闭后的回调\nconsole.log('afterClose');}",
              },
              {
                disabled: true,
                name: "onCancel",
                template:
                  "onCancel(${extParams}){\n// 点击遮罩层或右上角叉或取消按钮的回调\nconsole.log('onCancel');}",
              },
              {
                disabled: true,
                name: "onOk",
                template:
                  "onOk(${extParams}){\n// 点击确定回调\nconsole.log('onOk');}",
              },
            ],
          }}
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            this.closeModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            this.confirmAddUserModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.isOpenModal && this.state.modalType === "adduser"
          )}
          title={this._i18nText({
            "en-US": "add member",
            key: "i18n-gwumlhyv4ub",
            "zh-CN": "邀请成员",
          })}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: "left",
              labelCol: 4,
              layout: "horizontal",
              wrapperCol: 20,
            }}
            ref={this._refsManager.linkRef("formily_create")}
          >
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                "x-component-props": {
                  _unsafe_MixedSetter_enum_select: "ExpressionSetter",
                  _unsafe_MixedSetter_notFoundContent_select: "StringSetter",
                  allowClear: false,
                  disabled: false,
                  enum: __$$eval(() => this.state.organizations),
                  mode: "multiple",
                  notFoundContent: "",
                  placeholder: this._i18nText({
                    "en-US": "name",
                    key: "i18n-ihfepbwjnv",
                    "zh-CN": "被邀请的成员/组织名称",
                  }),
                },
              }}
              decoratorProps={{ "x-decorator-props": { asterisk: true } }}
              fieldProps={{
                _unsafe_MixedSetter_enum_select: "ExpressionSetter",
                enum: __$$eval(() => this.state.organizations),
                name: "organizations",
                title: this._i18nText({
                  "en-US": "Member organization",
                  key: "i18n-gmx7l7tolvj",
                  "zh-CN": "成员组织",
                }),
                "x-validator": [],
              }}
            />
          </FormilyForm>
        </Modal>
        <Modal
          __component_name="Modal"
          __events={{
            eventDataList: [
              {
                name: "onCancel",
                relatedEventName: "closeModal",
                type: "componentEvent",
              },
              {
                name: "onOk",
                relatedEventName: "confirmDeleteUserModal",
                type: "componentEvent",
              },
            ],
            eventList: [
              {
                disabled: false,
                name: "afterClose",
                templete:
                  "onCancel(${extParams}){\n// 完全关闭后的回调\nconsole.log('afterClose');}",
              },
              {
                disabled: true,
                name: "onCancel",
                template:
                  "onCancel(${extParams}){\n// 点击遮罩层或右上角叉或取消按钮的回调\nconsole.log('onCancel');}",
              },
              {
                disabled: true,
                name: "onOk",
                template:
                  "onOk(${extParams}){\n// 点击确定回调\nconsole.log('onOk');}",
              },
            ],
          }}
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            this.closeModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            this.confirmDeleteUserModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(
            () => this.state.isOpenModal && this.state.modalType === "delete"
          )}
          title={this._i18nText({
            "en-US": "Delete a user",
            key: "i18n-h52hay1ld2s",
            "zh-CN": "删除用户",
          })}
        >
          <Alert
            __component_name="Alert"
            bordered="none"
            message={this._i18nText({
              "en-US": "Confirm user deletion",
              key: "i18n-mmk8cikrrw",
              "zh-CN": "确定删除用户",
            })}
            showIcon={true}
            type="warning"
          />
        </Modal>
      </Page>
    );
  }
}

export default () => {
  const location = useLocation();
  const match = matchPath({ path: "/federation/:id" }, location.pathname);
  location.match = match;
  const self = {
    location,
    match,
    history,
  };
  const appHelper = {
    utils,
    ...self,
  };
  return (
    <DataProvider
      sdkSwrFuncs={[
        {
          func: "useGetFederation",
          params: {
            name: self.match?.params?.id,
          },
        },
      ]}
      render={(dataProps) => (
        <FederationDetail$$Page
          {...dataProps}
          self={self}
          appHelper={appHelper}
        />
      )}
    />
  );
};

function __$$eval(expr) {
  try {
    return expr();
  } catch (error) {}
}

function __$$evalArray(expr) {
  const res = __$$eval(expr);
  return Array.isArray(res) ? res : [];
}

function __$$createChildContext(oldContext, ext) {
  const childContext = {
    ...oldContext,
    ...ext,
  };
  childContext.__proto__ = oldContext;
  return childContext;
}