import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';
import { formatLocalizedString, transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import TextField from '@commercetools-uikit/text-field';
import LocalizedTextField from '@commercetools-uikit/localized-text-field';
import SelectField from '@commercetools-uikit/select-field';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { ContentNotification } from '@commercetools-uikit/notifications';
import DataTable from '@commercetools-uikit/data-table';
import Constraints from '@commercetools-uikit/constraints';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import RadioInput from '@commercetools-uikit/radio-input';
import Grid from '@commercetools-uikit/grid';
import DateTimeInput from '@commercetools-uikit/date-time-input';
import FieldLabel from '@commercetools-uikit/field-label';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Tag from '@commercetools-uikit/tag';
import { Pagination } from '@commercetools-uikit/pagination';
import { useCartDiscountsFetcher } from '../../hooks/use-cart-discounts-connector';
import messages from './messages';

type DiscountCodeData = {
  code: string;
  name?: Record<string, string>;
  description?: Record<string, string>;
  key?: string;
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
  maxApplications?: number;
  maxApplicationsPerCustomer?: number;
  cartPredicate?: string;
  cartDiscounts: string[];
};

type Step = 'configure' | 'fields' | 'cart-discounts' | 'preview' | 'import';

const previewColumns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'key', label: 'Key' },
  { key: 'status', label: 'Status' },
  { key: 'maxApplications', label: 'Max Applications' },
  { key: 'maxApplicationsPerCustomer', label: 'Max Per Customer' },
  { key: 'validFrom', label: 'Valid From' },
  { key: 'validUntil', label: 'Valid Until' },
  { key: 'cartPredicate', label: 'Cart Condition' },
  { key: 'cartDiscounts', label: 'Cart Discounts' },
];

const DiscountCodeGenerator = () => {
  const intl = useIntl();
  const { dataLocale, projectLanguages } = useCustomViewContext(
    (context) => ({
      dataLocale: context.dataLocale,
      projectLanguages: context.project?.languages,
    })
  );
  const [currentStep, setCurrentStep] = useState<Step>('configure');

  // Fetch cart discounts - only when needed
  const shouldFetchCartDiscounts = currentStep === 'cart-discounts';
  const { cartDiscounts, loading: cartDiscountsLoading, error: cartDiscountsError } = useCartDiscountsFetcher(shouldFetchCartDiscounts);

  // Debug log to verify component renders
  console.log('DiscountCodeGenerator rendered, step:', currentStep);

  // Step 1: Configure discount codes
  const [quantity, setQuantity] = useState('10');
  const [totalCharacters, setTotalCharacters] = useState('13');
  const [prefix, setPrefix] = useState('');

  // Step 2: Discount code fields
  const [codeName, setCodeName] = useState<Record<string, string>>({});
  const [codeDescription, setCodeDescription] = useState<Record<string, string>>({});
  const [isActive, setIsActive] = useState(true);
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [maxApplications, setMaxApplications] = useState('1');
  const [maxApplicationsPerCustomer, setMaxApplicationsPerCustomer] = useState('1');
  const [cartPredicate, setCartPredicate] = useState('');

  // Step 3: Cart discounts
  const [selectedCartDiscounts, setSelectedCartDiscounts] = useState<string[]>([]);

  // Preview & Generated data
  const [generatedCodes, setGeneratedCodes] = useState<DiscountCodeData[]>([]);
  const [previewPage, setPreviewPage] = useState(1);
  const [previewPerPage, setPreviewPerPage] = useState(20);

  const generateRandomCode = (codeLength: number): string => {
    // Only uppercase letters and numbers - no lowercase
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < codeLength; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const generateRandomKey = (): string => {
    return `key-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
  };

  const handleStep1Continue = () => {
    const numCodes = parseInt(quantity, 10);
    const numChars = parseInt(totalCharacters, 10);

    if (isNaN(numCodes) || numCodes < 1 || numCodes > 500000) {
      return;
    }

    if (isNaN(numChars) || numChars < 1) {
      return;
    }

    setCurrentStep('fields');
  };

  const handleStep2Continue = () => {
    setCurrentStep('cart-discounts');
  };

  const handleStep3Continue = () => {
    // Generate codes
    const numCodes = parseInt(quantity, 10);
    const numChars = parseInt(totalCharacters, 10);
    const prefixStr = prefix.toUpperCase();

    // Calculate random part length
    const prefixLength = prefixStr ? prefixStr.length + 1 : 0; // +1 for dash
    const randomLength = numChars - prefixLength;

    const codes: DiscountCodeData[] = [];

    for (let i = 0; i < numCodes; i++) {
      const randomPart = generateRandomCode(randomLength > 0 ? randomLength : numChars);
      const fullCode = prefixStr && randomLength > 0 ? `${prefixStr}-${randomPart}` : randomPart;

      codes.push({
        code: fullCode,
        name: Object.keys(codeName).length > 0 ? codeName : undefined,
        description: Object.keys(codeDescription).length > 0 ? codeDescription : undefined,
        key: generateRandomKey(),
        isActive,
        validFrom: validFrom || undefined,
        validUntil: validUntil || undefined,
        maxApplications: maxApplications ? parseInt(maxApplications, 10) : undefined,
        maxApplicationsPerCustomer: maxApplicationsPerCustomer ? parseInt(maxApplicationsPerCustomer, 10) : undefined,
        cartPredicate: cartPredicate || undefined,
        cartDiscounts: selectedCartDiscounts,
      });
    }

    setGeneratedCodes(codes);
    setCurrentStep('preview');
  };

  const handleDownloadCSV = () => {
    // Create CSV content
    const headers = ['code', 'key', 'isActive', 'validFrom', 'validUntil', 'maxApplications', 'maxApplicationsPerCustomer', 'cartPredicate', 'cartDiscounts'];
    const rows = generatedCodes.map(code => [
      code.code,
      code.key || '',
      code.isActive ? 'true' : 'false',
      code.validFrom || '',
      code.validUntil || '',
      code.maxApplications || '',
      code.maxApplicationsPerCustomer || '',
      code.cartPredicate || '',
      code.cartDiscounts.join(';'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `discount-codes-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setCurrentStep('import');
    // In a real implementation, this would call the API to import codes
  };

  const handleGenerateMore = () => {
    setCurrentStep('configure');
    setGeneratedCodes([]);
  };

  const handleBack = () => {
    if (currentStep === 'fields') setCurrentStep('configure');
    else if (currentStep === 'cart-discounts') setCurrentStep('fields');
    else if (currentStep === 'preview') setCurrentStep('cart-discounts');
  };

  const renderStepIndicator = () => {
    const steps = ['configure', 'fields', 'cart-discounts', 'preview'];
    const currentIndex = steps.indexOf(currentStep);

    return (
      <Spacings.Inline scale="m">
        {steps.map((step, index) => (
          <Text.Body key={step} isBold={index === currentIndex}>
            {index + 1}. {intl.formatMessage(messages[`step${index + 1}` as keyof typeof messages])}
          </Text.Body>
        ))}
      </Spacings.Inline>
    );
  };

  if (currentStep === 'import') {
    return (
      <Spacings.Stack scale="xl">
        <Text.Headline as="h2" intlMessage={messages.importTitle} />
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.importInfo} />
        </ContentNotification>
        <PrimaryButton
          label={intl.formatMessage(messages.generateMoreButton)}
          onClick={handleGenerateMore}
        />
      </Spacings.Stack>
    );
  }

  if (currentStep === 'preview') {
    const startIndex = (previewPage - 1) * previewPerPage;
    const endIndex = startIndex + previewPerPage;
    const paginatedCodes = generatedCodes.slice(startIndex, endIndex);

    return (
      <Spacings.Stack scale="xl">
        <Text.Headline as="h2">
          {intl.formatMessage(messages.previewTitle, { count: generatedCodes.length })}
        </Text.Headline>

        <Spacings.Stack scale="l">
          <div style={{ overflowX: 'auto' }}>
            <DataTable<DiscountCodeData>
              columns={previewColumns}
              rows={paginatedCodes}
              itemRenderer={(item, column) => {
                switch (column.key) {
                  case 'code':
                    return item.code;
                  case 'name':
                    return item.name ? formatLocalizedString(
                      { name: item.name },
                      {
                        key: 'name',
                        locale: dataLocale,
                        fallbackOrder: projectLanguages,
                        fallback: '-',
                      }
                    ) : '-';
                  case 'description':
                    return item.description ? formatLocalizedString(
                      { name: item.description },
                      {
                        key: 'name',
                        locale: dataLocale,
                        fallbackOrder: projectLanguages,
                        fallback: '-',
                      }
                    ) : '-';
                  case 'key':
                    return item.key || '-';
                  case 'status':
                    return item.isActive ? (
                      <Tag tone="primary">
                        {intl.formatMessage(messages.activeLabel)}
                      </Tag>
                    ) : (
                      <Tag type="normal">
                        {intl.formatMessage(messages.inactiveLabel)}
                      </Tag>
                    );
                  case 'maxApplications':
                    return item.maxApplications?.toString() || '-';
                  case 'maxApplicationsPerCustomer':
                    return item.maxApplicationsPerCustomer?.toString() || '-';
                  case 'validFrom':
                    return item.validFrom ? new Date(item.validFrom).toLocaleString() : '-';
                  case 'validUntil':
                    return item.validUntil ? new Date(item.validUntil).toLocaleString() : '-';
                  case 'cartPredicate':
                    return item.cartPredicate || '-';
                  case 'cartDiscounts':
                    return item.cartDiscounts.length > 0 ? item.cartDiscounts.join(', ') : '-';
                  default:
                    return null;
                }
              }}
            />
          </div>
          <Pagination
            page={previewPage}
            perPageRange="s"
            onPageChange={(page) => setPreviewPage(page)}
            perPage={previewPerPage}
            onPerPageChange={(perPage) => {
              setPreviewPerPage(perPage);
              setPreviewPage(1);
            }}
            totalItems={generatedCodes.length}
          />
        </Spacings.Stack>

        <Spacings.Inline>
          <SecondaryButton
            label={intl.formatMessage(messages.backButton)}
            onClick={handleBack}
          />
          <PrimaryButton
            label={intl.formatMessage(messages.downloadButton)}
            onClick={handleDownloadCSV}
          />
          <PrimaryButton
            label={intl.formatMessage(messages.importButton)}
            onClick={handleImport}
          />
        </Spacings.Inline>
      </Spacings.Stack>
    );
  }

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="s">
        <Text.Headline as="h2" intlMessage={messages.title} />
        <Text.Body intlMessage={messages.subtitle} />
      </Spacings.Stack>

      <Constraints.Horizontal max={13}>
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.uppercaseInfo} />
        </ContentNotification>
      </Constraints.Horizontal>

      {currentStep !== 'import' && currentStep !== 'preview' && renderStepIndicator()}

      <Constraints.Horizontal max={13}>
        {currentStep === 'configure' && (
          <CollapsiblePanel
            header={intl.formatMessage(messages.configureDiscountCodesHeader)}
            isDefaultClosed={false}
          >
            <Spacings.Stack scale="m">
              <TextField
                title={intl.formatMessage(messages.quantityLabel)}
                description={intl.formatMessage(messages.quantityDescription)}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                isRequired
                type="number"
              />
              <Grid
                gridGap="16px"
                gridAutoColumns="1fr"
                gridTemplateColumns="repeat(2, 1fr)"
              >
                <Grid.Item>
                  <TextField
                    title={intl.formatMessage(messages.totalCharactersLabel)}
                    value={totalCharacters}
                    onChange={(e) => setTotalCharacters(e.target.value)}
                    isRequired
                    type="number"
                  />
                </Grid.Item>
                <Grid.Item>
                  <TextField
                    title={intl.formatMessage(messages.prefixLabel)}
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="SUMMER26"
                    isRequired
                  />
                </Grid.Item>
              </Grid>
              <ContentNotification type="info">
                <Text.Body intlMessage={messages.prefixRecommendation} />
              </ContentNotification>
              <PrimaryButton
                label={intl.formatMessage(messages.continueButton)}
                onClick={handleStep1Continue}
              />
            </Spacings.Stack>
          </CollapsiblePanel>
        )}

        {currentStep === 'fields' && (
          <CollapsiblePanel
            header={intl.formatMessage(messages.discountCodeFieldsHeader)}
            description={intl.formatMessage(messages.discountCodeFieldsDescription)}
            isDefaultClosed={false}
          >
            <Spacings.Stack scale="m">
              <LocalizedTextField
                title={intl.formatMessage(messages.nameLabel)}
                value={codeName}
                onChange={(e) => setCodeName(e)}
                selectedLanguage="en"
              />
              <LocalizedTextField
                title={intl.formatMessage(messages.descriptionLabel)}
                value={codeDescription}
                onChange={(e) => setCodeDescription(e)}
                selectedLanguage="en"
              />
              <Spacings.Stack scale="xs">
                <FieldLabel title={intl.formatMessage(messages.statusLabel)} />
                <RadioInput.Group
                  value={isActive ? 'active' : 'inactive'}
                  onChange={(e) => setIsActive(e.target.value === 'active')}
                >
                  <RadioInput.Option value="active">
                    {intl.formatMessage(messages.activeLabel)}
                  </RadioInput.Option>
                  <RadioInput.Option value="inactive">
                    {intl.formatMessage(messages.inactiveLabel)}
                  </RadioInput.Option>
                </RadioInput.Group>
              </Spacings.Stack>
              <Spacings.Stack scale="xs">
                <FieldLabel title={intl.formatMessage(messages.validFromLabel)} />
                <DateTimeInput
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value || '')}
                  timeZone="UTC"
                  horizontalConstraint={13}
                />
              </Spacings.Stack>
              <Spacings.Stack scale="xs">
                <FieldLabel title={intl.formatMessage(messages.validUntilLabel)} />
                <DateTimeInput
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value || '')}
                  timeZone="UTC"
                  horizontalConstraint={13}
                />
              </Spacings.Stack>
              <Grid
                gridGap="16px"
                gridAutoColumns="1fr"
                gridTemplateColumns="repeat(2, 1fr)"
              >
                <Grid.Item>
                  <TextField
                    title={intl.formatMessage(messages.maxApplicationsLabel)}
                    value={maxApplications}
                    onChange={(e) => setMaxApplications(e.target.value)}
                    type="number"
                    min="1"
                    isRequired
                  />
                </Grid.Item>
                <Grid.Item>
                  <TextField
                    title={intl.formatMessage(messages.maxApplicationsPerCustomerLabel)}
                    value={maxApplicationsPerCustomer}
                    onChange={(e) => setMaxApplicationsPerCustomer(e.target.value)}
                    type="number"
                    min="1"
                    isRequired
                  />
                </Grid.Item>
              </Grid>
              <TextField
                title={intl.formatMessage(messages.cartPredicateLabel)}
                description={intl.formatMessage(messages.cartPredicateDescription)}
                value={cartPredicate}
                onChange={(e) => setCartPredicate(e.target.value)}
                isMultilineInput
              />
              <Spacings.Inline>
                <SecondaryButton
                  label={intl.formatMessage(messages.backButton)}
                  onClick={handleBack}
                />
                <PrimaryButton
                  label={intl.formatMessage(messages.continueButton)}
                  onClick={handleStep2Continue}
                />
              </Spacings.Inline>
            </Spacings.Stack>
          </CollapsiblePanel>
        )}

        {currentStep === 'cart-discounts' && (
          <Spacings.Stack scale="l">
            <Text.Headline as="h3">{intl.formatMessage(messages.cartDiscountsHeader)}</Text.Headline>
            <Text.Body>{intl.formatMessage(messages.cartDiscountsDescription)}</Text.Body>

            <Spacings.Stack scale="m">
              {cartDiscountsLoading && <LoadingSpinner />}
              {cartDiscountsError && (
                <>
                  <ContentNotification type="warning">
                    <Text.Body>
                      Could not load cart discounts from API. This may be because you're running locally or there's a connection issue.
                      You can still continue to generate and preview codes.
                    </Text.Body>
                  </ContentNotification>
                  <SelectField
                    title={intl.formatMessage(messages.cartDiscountsLabel)}
                    description={intl.formatMessage(messages.cartDiscountsNote)}
                    value={selectedCartDiscounts[0] || ''}
                    onChange={(e) => setSelectedCartDiscounts([e.target.value])}
                    options={[
                      { value: '', label: intl.formatMessage(messages.selectCartDiscount) },
                      { value: 'demo-discount-1', label: 'Demo Cart Discount 1' },
                      { value: 'demo-discount-2', label: 'Demo Cart Discount 2' },
                    ]}
                  />
                </>
              )}
              {!cartDiscountsLoading && !cartDiscountsError && (
                <>
                  {cartDiscounts.length === 0 && (
                    <ContentNotification type="info">
                      <Text.Body>
                        No cart discounts with "requires discount code" found. You can still continue to generate codes.
                      </Text.Body>
                    </ContentNotification>
                  )}
                  <SelectField
                    title={intl.formatMessage(messages.cartDiscountsLabel)}
                    description={intl.formatMessage(messages.cartDiscountsNote)}
                    value={selectedCartDiscounts[0] || ''}
                    onChange={(e) => setSelectedCartDiscounts([e.target.value])}
                    options={[
                      { value: '', label: intl.formatMessage(messages.selectCartDiscount) },
                      ...(cartDiscounts.length === 0
                        ? [
                            { value: 'demo-discount-1', label: 'Demo Cart Discount 1' },
                            { value: 'demo-discount-2', label: 'Demo Cart Discount 2' },
                          ]
                        : cartDiscounts.map((discount) => ({
                            value: discount.id,
                            label: discount.key || formatLocalizedString(
                              {
                                name: transformLocalizedFieldToLocalizedString(
                                  discount.nameAllLocales ?? []
                                ),
                              },
                              {
                                key: 'name',
                                locale: dataLocale,
                                fallbackOrder: projectLanguages,
                                fallback: NO_VALUE_FALLBACK,
                              }
                            ),
                          }))
                      ),
                    ]}
                  />
                </>
              )}
              <Spacings.Inline>
                <SecondaryButton
                  label={intl.formatMessage(messages.backButton)}
                  onClick={handleBack}
                />
                <PrimaryButton
                  label={intl.formatMessage(messages.continueButton)}
                  onClick={handleStep3Continue}
                />
              </Spacings.Inline>
            </Spacings.Stack>
          </Spacings.Stack>
        )}
      </Constraints.Horizontal>
    </Spacings.Stack>
  );
};

DiscountCodeGenerator.displayName = 'DiscountCodeGenerator';

export default DiscountCodeGenerator;
